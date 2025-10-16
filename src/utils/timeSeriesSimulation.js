import { ECONOMIC_DATA } from '../config/economicData';

/**
 * Time-series simulation - Mô phỏng theo thời gian (30 ngày)
 * Hiển thị cách tỷ giá và các chỉ số thay đổi theo thời gian
 */

export class TimeSeriesSimulation {
  constructor(params) {
    this.params = params;
    this.days = 30; // Mô phỏng 30 ngày
    this.baseline = ECONOMIC_DATA.exchangeRateStability.centralRate;
  }

  /**
   * Chạy mô phỏng 30 ngày
   */
  simulate() {
    const timeline = [];
    
    // Trạng thái ban đầu
    let currentRate = this.baseline;
    let currentReserves = this.params.foreignReserves;
    let cumulativeOutflow = 0;
    
    for (let day = 0; day <= this.days; day++) {
      const dayData = this.simulateDay(day, currentRate, currentReserves, cumulativeOutflow);
      
      timeline.push(dayData);
      
      // Update cho ngày tiếp theo
      currentRate = dayData.exchangeRate;
      currentReserves = dayData.reserves;
      cumulativeOutflow += dayData.capitalFlow;
    }
    
    return timeline;
  }

  /**
   * Mô phỏng 1 ngày
   */
  simulateDay(day, currentRate, currentReserves, cumulativeOutflow) {
    // Calculate interest rate differential
    const rateDiff = this.params.vietnamRate - this.params.usRate;
    
    // Capital flow pressure (negative = outflow)
    const openness = (this.params.capitalOpenness + 2) / 2; // Normalize 0-1
    const baseFlow = rateDiff * openness * 10;
    
    // Crisis scenarios có panic - capital flight tăng theo thời gian
    let panicMultiplier = 1;
    
    // CHỈ có panic trong các kịch bản khủng hoảng thực sự:
    // 1. Lãi suất thấp hơn Fed NHIỀU (-1.5% trở xuống) + Mở cửa vốn
    // 2. HOẶC Dự trữ đã thấp (<40B) + Mở cửa vốn + Lãi suất thấp hơn Fed
    const isCrisisScenario = (rateDiff < -1.5 && openness > 0.5) || 
                             (currentReserves < 40 && openness > 0.5 && rateDiff < 0);
    
    if (isCrisisScenario) {
      // Khủng hoảng: panic tăng theo ngày
      panicMultiplier = 1 + (day / this.days) * 2; // Panic tăng gấp đôi cuối kỳ
    }
    
    const dailyFlow = baseFlow * panicMultiplier;
    
    // Reserves intervention
    let reserveChange = 0;
    let rateChange = 0;
    
    if (dailyFlow < 0) {
      // Capital outflow - NHNN phải can thiệp
      const interventionNeeded = Math.abs(dailyFlow) * 0.5;
      
      if (currentReserves > interventionNeeded) {
        // Còn đủ reserves để can thiệp
        reserveChange = -interventionNeeded;
        rateChange = dailyFlow * 30; // Giảm nhẹ do can thiệp
      } else {
        // Reserves cạn kiệt - không thể can thiệp
        reserveChange = -currentReserves * 0.3; // Dùng hết reserves còn lại
        rateChange = dailyFlow * 100 * (1 + day / this.days); // Tỷ giá sụp đổ
      }
    } else {
      // Capital inflow
      reserveChange = dailyFlow * 0.3;
      rateChange = dailyFlow * -30; // VND tăng giá
    }
    
    // New exchange rate
    const newRate = currentRate + rateChange;
    const newReserves = Math.max(0, currentReserves + reserveChange);
    
    // Volatility increases with crisis
    const distanceFromBaseline = Math.abs((newRate - this.baseline) / this.baseline);
    const volatility = 5 + distanceFromBaseline * 100 + (Math.abs(dailyFlow) * 2);
    
    // Crisis indicators (BỎ check biên độ ±5% vì đó là daily limit, không phải 30-day cumulative)
    const reservesCritical = newReserves < 30;
    const massiveOutflow = dailyFlow < -10; // Vốn tháo chạy hàng loạt
    const highVolatility = volatility > 20;
    
    // Chỉ crisis khi reserves cạn HOẶC (vốn chảy ra mạnh + volatility cao)
    const isCrisis = reservesCritical || (massiveOutflow && highVolatility);
    
    return {
      day,
      exchangeRate: newRate,
      reserves: newReserves,
      capitalFlow: dailyFlow,
      volatility,
      reserveChange,
      rateChange,
      cumulativeOutflow: cumulativeOutflow + dailyFlow,
      isCrisis,
      severity: this.calculateSeverity(newRate, newReserves, volatility, dailyFlow),
      // Track actual interest rates for deviation chart
      vietnamRate: this.params.vietnamRate,
      usRate: this.params.usRate,
      rateDeviation: rateDiff,
    };
  }

  calculateSeverity(rate, reserves, volatility, flow) {
    const reservesCritical = reserves < 30;
    const reservesLow = reserves < 50;
    const highVolatility = volatility > 20;
    const moderateVolatility = volatility > 15;
    const heavyOutflow = flow < -10;
    const moderateOutflow = flow < -5;
    
    // Crisis: Dự trữ cạn kiệt HOẶC (vốn chảy ra mạnh + volatility cực cao)
    if (reservesCritical || (heavyOutflow && highVolatility)) {
      return 'crisis';
    }
    
    // Warning: Dự trữ thấp HOẶC (vốn chảy ra + volatility cao)
    if (reservesLow || (moderateOutflow && moderateVolatility)) {
      return 'warning';
    }
    
    return 'stable';
  }
}

export function createTimeSeriesSimulation(params) {
  const sim = new TimeSeriesSimulation(params);
  return sim.simulate();
}

