import React, { useState } from "react";
import Swal from "sweetalert2";
import moment from "moment";
import PageLayout from "../../components/global/PageLayout";

export default function DataFormatter() {
    const [groupData, setGroupData] = useState({
        name: "",
        commision: "",
        multiplier: "",
        date: "",
    });

    const [nameData, setNameData] = useState({
        sb: { assigned: "", numbers: "" },
        gw: { assigned: "", numbers: "" },
        db: { assigned: "", numbers: "" },
        dm: { assigned: "", numbers: "" },
        sg: { assigned: "", numbers: "" },
        ag: { assigned: "", numbers: "" },
        fb: { assigned: "", numbers: "" },
        al: { assigned: "", numbers: "" },
        gb: { assigned: "", numbers: "" },
        dw: { assigned: "", numbers: "" },
        gl: { assigned: "", numbers: "" },
        ds: { assigned: "", numbers: "" },
    });

    const [output, setOutput] = useState("");
    const [copied, setCopied] = useState(false);

    const handleChange = (name, field, value) => {
        setNameData((prev) => ({
            ...prev,
            [name]: { ...prev[name], [field]: value },
        }));
    };

    const extractMultiplier = (text) => {
        let m;
        if ((m = text.match(/:(\d+)/))) return parseInt(m[1]);
        if ((m = text.match(/\((\d+)\)/))) return parseInt(m[1]);
        if ((m = text.match(/rs\s*(\d+)|(\d+)\s*rs/i)))
            return parseInt(m[1] || m[2]);
        if ((m = text.match(/intu\s*(\d+)|(\d+)\s*intu/i)))
            return parseInt(m[1] || m[2]);
        if ((m = text.match(/=(\d+)/))) return parseInt(m[1]);
        return 10;
    };

    const hasKeyword = (text, arr) =>
        arr.some((k) => new RegExp(`\\b${k}\\b`, "i").test(text));

    const expandRange = (text) => {
        const m = text.match(/(\d+)\s*(?:-|to)\s*(\d+)/i);
        if (!m) return null;
        let out = [];
        for (let i = +m[1]; i <= +m[2]; i++) {
            out.push(i.toString().padStart(m[1].length, "0"));
        }
        return out;
    };

    const getCommision = (total, commision) =>
        ((total * commision) / 100).toFixed(0);

    const processData = () => {
        if (
            !groupData.name ||
            !groupData.commision ||
            !groupData.multiplier ||
            !groupData.date
        ) {
            Swal.fire("Action Required", "Enter group config first", "warning");
            return;
        }

        let results = [];
        let grandTotal = 0;
        let grandPassTotal = 0;

        for (let [name, data] of Object.entries(nameData)) {
            const assigned = data.assigned.padStart(2, "0");
            let totalAll = 0;
            let totalMatched = 0;

            const lines = (data.numbers || "")
                .split("\n")
                .map((l) => l.trim())
                .filter(Boolean);

            lines.forEach((line) => {
                const multiplier = extractMultiplier(line);

                let clean = line.replace(
                    /:\d+|\(\d+\)|rs\s*\d+|\d+\s*rs|intu\s*\d+|\d+\s*intu|=\d+|\d+aa|\d+bb|\d+jc/gi,
                    ""
                );

                let numbers = [];
                const range = expandRange(clean);

                if (range) numbers = range;
                else if (/^\d+$/.test(clean)) numbers = clean.split("");
                else numbers = clean.split(/[\s,]+/).filter(Boolean);

                const count = numbers.length;

                if (hasKeyword(line, ["wp", "palat", "palt"])) {
                    totalAll += count * 2 * multiplier;
                } else if (hasKeyword(line, ["jc", "joda", "bina"])) {
                    totalAll += count * (count - 1) * multiplier;
                } else if (/^\d+$/.test(clean)) {
                    totalAll += count * count * multiplier;
                } else {
                    totalAll += count * multiplier;
                }

                let matched = numbers.filter((n) => n === assigned).length;

                if (hasKeyword(line, ["aa", "a", "ander"])) {
                    matched = numbers.filter((n) => n.startsWith(assigned[0])).length;
                    totalMatched += (matched * multiplier) / 10;
                    return;
                }

                if (hasKeyword(line, ["bb", "b", "bahar"]) || /:\s*100/.test(line)) {
                    matched = numbers.filter((n) => n.endsWith(assigned[1])).length;
                    totalMatched += (matched * multiplier) / 10;
                    return;
                }

                if (/^\d+$/.test(clean)) {
                    if (clean.includes(assigned[0]) && clean.includes(assigned[1])) {
                        totalMatched += multiplier;
                    }
                    return;
                }

                totalMatched += matched * multiplier;
            });

            grandTotal += totalAll;
            grandPassTotal += totalMatched;

            results.push({ name, totalAll, totalMatched });
        }

        let formatted = "";
        formatted += `${moment(groupData.date).format("DD-MM-YYYY")}\n`;
        formatted += `${groupData.name}\n\n`;

        results.forEach((r) => {
            formatted += `${r.name.toUpperCase().padEnd(4)} ${r.totalAll
                .toString()
                .padEnd(10)} (${r.totalMatched})\n`;
        });

        const commission = getCommision(grandTotal, groupData.commision);
        const net = grandTotal - commission;
        const pass = grandPassTotal * groupData.multiplier;

        formatted += `\nTOTAL ${grandTotal}-${commission}=${net}\n\n`;
        formatted += `Pass ${grandPassTotal}x${groupData.multiplier}=${pass}\n\n`;

        formatted +=
            pass > net
                ? `Final ${pass}-${net}=${pass - net} Dene\n`
                : `Final ${net}-${pass}=${net - pass} Lene\n`;

        setOutput(formatted);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clearData = () => {
        setOutput("");
        setCopied(false);
        setGroupData({ name: "", commision: "", multiplier: "", date: "" });
        setNameData(
            Object.fromEntries(
                Object.keys(nameData).map((k) => [k, { assigned: "", numbers: "" }])
            )
        );
    };

    return (
        <PageLayout>
            <div className="min-h-screen bg-gray-50 px-6 py-10">
                <div className="max-w-[1600px] mx-auto">

                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Data Calculator
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Advanced data processing & calculation tool
                        </p>
                    </div>

                    {/* Group Configuration */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6">
                            Group Configuration
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {[
                                { label: "Date", type: "date", key: "date" },
                                { label: "Name", type: "text", key: "name" },
                                { label: "Multiplier", type: "number", key: "multiplier" },
                                { label: "Commission (%)", type: "number", key: "commision" },
                            ].map((item) => (
                                <div key={item.key}>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        {item.label}
                                    </label>
                                    <input
                                        type={item.type}
                                        value={groupData[item.key]}
                                        onChange={(e) =>
                                            setGroupData({ ...groupData, [item.key]: e.target.value })
                                        }
                                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#1E9ABC] outline-none"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Data Blocks */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {Object.entries(nameData).map(([name, data]) => (
                            <div
                                key={name}
                                className="bg-white rounded-2xl shadow-sm p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800 uppercase">
                                        {name}
                                    </h3>
                                    <input
                                        type="number"
                                        value={data.assigned}
                                        onChange={(e) =>
                                            handleChange(name, "assigned", e.target.value)
                                        }
                                        className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-[#1E9ABC] outline-none"
                                    />
                                </div>

                                <textarea
                                    rows="7"
                                    value={data.numbers}
                                    onChange={(e) =>
                                        handleChange(name, "numbers", e.target.value)
                                    }
                                    placeholder="Enter numbers here..."
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1E9ABC] outline-none font-mono"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4 justify-end mb-8">
                        <button
                            onClick={processData}
                            className="px-8 py-3 bg-[#1E9ABC] text-white rounded-xl font-semibold hover:opacity-90 transition"
                        >
                            Process Data
                        </button>

                        {groupData.date && (
                            <button
                                onClick={clearData}
                                className="px-8 py-3 border border-red-300 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition"
                            >
                                Clear All
                            </button>
                        )}

                        {output && (
                            <button
                                disabled={copied}
                                onClick={copyToClipboard}
                                className={`px-8 py-3 rounded-xl font-semibold transition ${copied
                                        ? "bg-green-600 text-white"
                                        : "bg-purple-600 text-white hover:opacity-90"
                                    }`}
                            >
                                {copied ? "Copied" : "Copy Result"}
                            </button>
                        )}
                    </div>

                    {/* Output */}
                    {output && (
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Calculation Result
                            </h2>
                            <pre className="bg-gray-100 p-4 rounded-xl text-sm text-gray-800 overflow-auto max-h-96 font-mono">
                                {output}
                            </pre>
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
    );

}



