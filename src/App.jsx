import "./App.css";
import { useState, useEffect } from "react";

function App() {
    const [percentages, setPercentages] = useState({
        profit: 0,
        zakat: 0,
        rent: 0,
        buying_products: 0,
    });

    const [totalAmount, setTotalAmount] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    // جلب النسب المحفوظة عند فتح التطبيق
    useEffect(() => {
        const savedPercentages = localStorage.getItem("shopPercentages");
        if (savedPercentages) {
            setPercentages(JSON.parse(savedPercentages));
        }
    }, []);

    // حفظ النسب وعرض الرسالة
    const handleSaveToLocalStorage = () => {
        localStorage.setItem("shopPercentages", JSON.stringify(percentages));
        setShowMessage(true);
    };

    // دالة الحساب
    const calculateDistribution = (percentage) => {
        const amount = parseFloat(totalAmount) || 0;
        const perc = parseFloat(percentage) || 0;
        return ((amount * perc) / 100).toFixed(2);
    };

    // التعامل مع تغيير النسب (يسمح بالصفر وبمسح الحقل)
    const handlePercentageChange = (field, value) => {
        const val = value === "" ? "" : Number(value);
        setPercentages((prev) => ({ ...prev, [field]: val }));
    };

    return (
        <div dir="rtl" className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 font-sans pb-20">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 text-center pt-10 pb-4 w-fit mx-auto drop-shadow-sm">حسابات المحل 🌸</h1>

            <div id="container" className="max-w-5xl mx-auto px-4 mt-8">
                {/* قسم إدخال النسب */}
                <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-pink-200">
                    <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">حددي نسب التوزيع (%)</h2>
                    <form
                        action=" "
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSaveToLocalStorage();
                        }}
                        className="flex flex-col gap-6 items-center">
                        <div className="flex flex-row flex-wrap justify-center gap-6 w-full">
                            <div className="flex flex-col gap-2 w-40">
                                <label htmlFor="profit" className="font-semibold text-pink-700 text-lg text-center">
                                    الربح
                                </label>
                                <input
                                    className="border-2 border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 rounded-xl p-2 text-center text-lg outline-none transition-all"
                                    type="number"
                                    value={percentages.profit}
                                    onChange={(e) => handlePercentageChange("profit", e.target.value)}
                                    id="profit"
                                />
                            </div>

                            <div className="flex flex-col gap-2 w-40">
                                <label htmlFor="zakat" className="font-semibold text-pink-700 text-lg text-center">
                                    الزكاة
                                </label>
                                <input
                                    className="border-2 border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 rounded-xl p-2 text-center text-lg outline-none transition-all"
                                    type="number"
                                    value={percentages.zakat}
                                    onChange={(e) => handlePercentageChange("zakat", e.target.value)}
                                    id="zakat"
                                />
                            </div>

                            <div className="flex flex-col gap-2 w-40">
                                <label htmlFor="rent" className="font-semibold text-pink-700 text-lg text-center">
                                    الإيجار
                                </label>
                                <input
                                    className="border-2 border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 rounded-xl p-2 text-center text-lg outline-none transition-all"
                                    type="number"
                                    value={percentages.rent}
                                    onChange={(e) => handlePercentageChange("rent", e.target.value)}
                                    id="rent"
                                />
                            </div>

                            <div className="flex flex-col gap-2 w-40">
                                <label htmlFor="buying-products" className="font-semibold text-pink-700 text-lg text-center">
                                    شراء بضاعة
                                </label>
                                <input
                                    className="border-2 border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 rounded-xl p-2 text-center text-lg outline-none transition-all"
                                    type="number"
                                    value={percentages.buying_products}
                                    onChange={(e) => handlePercentageChange("buying_products", e.target.value)}
                                    id="buying-products"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-4 hover:scale-105 hover:translate-y-1 hover:cursor-pointer transform transition-all duration-300 bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:from-pink-500 hover:to-purple-500 hover:shadow-lg hover:shadow-pink-300/50 hover:-translate-y-1 transform transition-all duration-300 font-bold text-xl rounded-full">
                            حفظ النسب ✨
                        </button>
                    </form>
                </div>

                {/* نافذة التأكيد (Modal) */}
                {showMessage && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
                        <div className="bg-white border-2 border-pink-300 p-8 rounded-3xl shadow-2xl flex flex-col items-center transform transition-transform scale-105">
                            <p className="text-2xl font-bold text-pink-600 mb-2">تم الحفظ! 💖</p>
                            <p className="text-gray-600 mb-6 text-center">تم حفظ النسب الخاصة بك بنجاح.</p>
                            <button
                                onClick={() => setShowMessage(false)}
                                className="px-8 py-2 hover:cursor-pointer hover:scale-105 hover:-translate-y-1 transform transition-all duration-300 bg-pink-500 text-white rounded-full font-bold hover:bg-pink-600 transition-colors shadow-md hover:shadow-lg">
                                إغلاق
                            </button>
                        </div>
                    </div>
                )}

                {/* فاصل جمالي */}
                <div className="flex justify-center my-10">
                    <div className="h-1 w-32 bg-gradient-to-r from-transparent via-pink-300 to-transparent rounded-full"></div>
                </div>

                {/* قسم النتائج (المخرجات) */}
                <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-pink-200">
                    <form action=" " onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4 items-center justify-center mx-auto mb-10">
                        <label htmlFor="total-amount" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-center">
                            أدخلي إجمالي المبلغ المتاح <span>💰</span>
                        </label>
                        <input
                            className="border-2 border-pink-300 bg-white/80 p-4 rounded-2xl text-2xl text-center w-72 shadow-inner focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all"
                            type="number"
                            id="total-amount"
                            placeholder="مثال: 1000"
                            value={totalAmount}
                            onChange={(e) => setTotalAmount(e.target.value)}
                        />
                    </form>

                    <div id="outputs" className="flex flex-row flex-wrap justify-center gap-6 w-full mx-auto">
                        <div className="group flex flex-col items-center bg-gradient-to-b from-white to-pink-50 border border-pink-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 w-48 cursor-default">
                            <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">📈</div>
                            <h3 className="text-xl font-bold text-gray-700">الربح</h3>
                            <span className="text-3xl font-black text-pink-500 mt-2">{calculateDistribution(percentages.profit)}</span>
                        </div>

                        <div className="group flex flex-col items-center bg-gradient-to-b from-white to-pink-50 border border-pink-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 w-48 cursor-default">
                            <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">🤲</div>
                            <h3 className="text-xl font-bold text-gray-700">الزكاة</h3>
                            <span className="text-3xl font-black text-pink-500 mt-2">{calculateDistribution(percentages.zakat)}</span>
                        </div>

                        <div className="group flex flex-col items-center bg-gradient-to-b from-white to-pink-50 border border-pink-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 w-48 cursor-default">
                            <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">🏠</div>
                            <h3 className="text-xl font-bold text-gray-700">الإيجار</h3>
                            <span className="text-3xl font-black text-pink-500 mt-2">{calculateDistribution(percentages.rent)}</span>
                        </div>

                        <div className="group flex flex-col items-center bg-gradient-to-b from-white to-pink-50 border border-pink-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 w-48 cursor-default">
                            <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">🛍️</div>
                            <h3 className="text-xl font-bold text-gray-700 text-center">شراء بضاعة</h3>
                            <span className="text-3xl font-black text-pink-500 mt-2">{calculateDistribution(percentages.buying_products)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
