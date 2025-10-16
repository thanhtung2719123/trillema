// Real economic data for Vietnam (2023-2025)
export const ECONOMIC_DATA = {
  // Monetary Independence (MI) Data
  monetaryIndependence: {
    vietnamPolicyRate: 4.50, // Vietnam Refinancing Rate (%)
    usFedRate: 4.25, // US Federal Funds Rate (upper bound) (%)
    interestRateDifferential: 0.25, // i - i* (%)
  },
  
  // Exchange Rate Stability (ERS) Data
  exchangeRateStability: {
    centralRate: 25186, // VND per USD (SBV Central Rate, Sep 2025)
    volatilityBand: 5, // ±5% band
    foreignReserves: 83.08, // Billion USD (2024)
    historicLow: 26436, // VND per USD (August record low)
  },
  
  // Financial Integration/Capital Openness (KAO) Data
  financialIntegration: {
    kaopenIndex: -0.166, // Chinn-Ito Index (2021) - negative indicates restricted
    capitalOutflow: 78000, // VND billion (Jan-Aug 2025)
  },
  
  // Simulation constraints
  constraints: {
    minReserves: 20, // Minimum safe reserves (billion USD)
    maxVolatility: 15, // Maximum acceptable volatility (%)
    maxRateDifferential: 3, // Maximum rate differential before crisis (%)
  }
};

// Translation data
export const TRANSLATIONS = {
  vi: {
    title: "Mô Phỏng Tỷ Giá Hối Đoái Việt Nam",
    subtitle: "Mô hình Bộ Ba Bất Khả Thi (Impossible Trinity)",
    description: "Một quốc gia chỉ có thể đạt được hai trong ba mục tiêu chính sách: Độc lập tiền tệ, Ổn định tỷ giá, và Tích hợp tài chính.",
    monetaryIndependence: "Độc Lập Tiền Tệ (MI)",
    exchangeRateStability: "Ổn Định Tỷ Giá (ERS)",
    financialIntegration: "Tích Hợp Tài Chính (KAO)",
    vietnamPolicyRate: "Lãi Suất Tái Cấp Vốn VN (%)",
    usFedRate: "Lãi Suất Fed Mỹ (%)",
    capitalOpenness: "Độ Mở Vốn (KAOPEN)",
    foreignReserves: "Dự Trữ Ngoại Hối (Tỷ USD)",
    exchangeRate: "Tỷ Giá VND/USD",
    volatility: "Độ Biến Động (%)",
    simulate: "Mô Phỏng",
    reset: "Đặt Lại",
    explanation: "Giải Thích Bằng AI",
    currentScenario: "Kịch Bản Hiện Tại",
    simulationResults: "Kết Quả Mô Phỏng",
    loading: "Đang tải...",
    crisis: "Khủng Hoảng!",
    stable: "Ổn Định",
    warning: "Cảnh Báo",
  },
  en: {
    title: "Vietnam Exchange Rate Simulation",
    subtitle: "The Impossible Trinity Model",
    description: "A country can only achieve two of three policy goals simultaneously: Monetary Independence, Exchange Rate Stability, and Financial Integration.",
    monetaryIndependence: "Monetary Independence (MI)",
    exchangeRateStability: "Exchange Rate Stability (ERS)",
    financialIntegration: "Financial Integration (KAO)",
    vietnamPolicyRate: "Vietnam Policy Rate (%)",
    usFedRate: "US Fed Rate (%)",
    capitalOpenness: "Capital Openness (KAOPEN)",
    foreignReserves: "Foreign Reserves (Billion USD)",
    exchangeRate: "Exchange Rate VND/USD",
    volatility: "Volatility (%)",
    simulate: "Simulate",
    reset: "Reset",
    explanation: "AI Explanation",
    currentScenario: "Current Scenario",
    simulationResults: "Simulation Results",
    loading: "Loading...",
    crisis: "Crisis!",
    stable: "Stable",
    warning: "Warning",
  }
};

