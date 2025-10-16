import React from 'react';
import { AlertTriangle, TrendingUp, Globe, Shield } from 'lucide-react';
import './ScenarioPresets.css';

const ScenarioPresets = ({ onSelectScenario, language }) => {
  const scenarios = [
    {
      id: 'baseline',
      icon: <Shield size={24} />,
      nameVi: '🇻🇳 Việt Nam Hiện Tại',
      nameEn: '🇻🇳 Vietnam Current',
      descriptionVi: 'MI + ERS, hạn chế vốn (KAOPEN -0.166)',
      descriptionEn: 'MI + ERS, restricted capital (KAOPEN -0.166)',
      params: {
        vietnamRate: 4.5,
        usRate: 4.25,
        capitalOpenness: -0.166,
        foreignReserves: 83.08,
      },
      goals: ['mi', 'ers'],
      severity: 'stable',
    },
    {
      id: 'violation',
      icon: <AlertTriangle size={24} />,
      nameVi: '⚠️ Vi Phạm Trilemma',
      nameEn: '⚠️ Trilemma Violation',
      descriptionVi: 'Cố đạt cả 3: MI + ERS + KAO → Khủng hoảng!',
      descriptionEn: 'Trying all 3: MI + ERS + KAO → Crisis!',
      params: {
        vietnamRate: 6.0, // Độc lập tiền tệ (lãi suất cao)
        usRate: 4.25,
        capitalOpenness: 1.5, // Mở cửa tài chính
        foreignReserves: 40.0, // Dự trữ thấp - không đủ để bảo vệ tỷ giá
      },
      goals: ['mi', 'ers', 'kao'], // Cố đạt cả 3!
      severity: 'crisis',
      warningVi: 'Kịch bản này không bền vững! Dự trữ ngoại hối sẽ cạn kiệt nhanh chóng và tỷ giá sẽ sụp đổ.',
      warningEn: 'This scenario is unsustainable! Foreign reserves will deplete rapidly and the exchange rate will collapse.',
    },
    {
      id: 'capital-liberalization',
      icon: <Globe size={24} />,
      nameVi: '🌏 Mở Cửa Vốn',
      nameEn: '🌏 Capital Liberalization',
      descriptionVi: 'VN mở cửa tài chính → Tỷ giá biến động mạnh',
      descriptionEn: 'VN opens capital account → High volatility',
      params: {
        vietnamRate: 4.5,
        usRate: 4.25,
        capitalOpenness: 1.8, // Mở cửa mạnh
        foreignReserves: 83.08,
      },
      goals: ['mi', 'kao'], // Hy sinh ERS
      severity: 'warning',
      warningVi: 'Tỷ giá sẽ dao động mạnh, có thể vượt biên độ ±5%. NHNN mất khả năng kiểm soát tỷ giá.',
      warningEn: 'Exchange rate will fluctuate heavily, may exceed ±5% band. SBV loses control over exchange rate.',
    },
    {
      id: 'rate-hike-defense',
      icon: <TrendingUp size={24} />,
      nameVi: '📈 Tăng Lãi Suất Phòng Thủ',
      nameEn: '📈 Defensive Rate Hike',
      descriptionVi: 'Fed tăng lãi → VN buộc phải theo để giữ vốn',
      descriptionEn: 'Fed hikes → VN must follow to retain capital',
      params: {
        vietnamRate: 7.5, // Buộc phải tăng lãi suất cao
        usRate: 6.0, // Fed tăng lãi suất
        capitalOpenness: 0.5, // Một phần mở cửa
        foreignReserves: 60.0, // Dự trữ giảm do can thiệp trước đó
      },
      goals: ['ers', 'kao'], // Hy sinh MI
      severity: 'warning',
      warningVi: 'Mất độc lập tiền tệ - phải theo Fed. Lãi suất cao gây thiệt hại cho kinh tế trong nước.',
      warningEn: 'Loss of monetary independence - must follow Fed. High rates damage domestic economy.',
    },
    {
      id: 'crisis-1997',
      icon: <AlertTriangle size={24} />,
      nameVi: '💥 Khủng Hoảng 1997',
      nameEn: '💥 1997-Style Crisis',
      descriptionVi: 'Mở cửa + Lãi suất thấp + Dự trữ cạn → Sụp đổ',
      descriptionEn: 'Open capital + Low rates + Low reserves → Collapse',
      params: {
        vietnamRate: 3.0, // Lãi suất thấp hơn Fed
        usRate: 5.5, // Fed cao
        capitalOpenness: 1.5, // Đã mở cửa
        foreignReserves: 25.0, // Dự trữ gần cạn
      },
      goals: ['kao'], // Chỉ đạt được KAO, mất cả MI và ERS
      severity: 'crisis',
      warningVi: 'KHỦNG HOẢNG TÀI CHÍNH! Vốn tháo chạy hàng loạt, tỷ giá mất giá mạnh, cần cứu trợ quốc tế.',
      warningEn: 'FINANCIAL CRISIS! Massive capital flight, currency collapse, international bailout needed.',
    },
    {
      id: 'hard-peg',
      icon: <Shield size={24} />,
      nameVi: '🇭🇰 Hard Peg (Hong Kong)',
      nameEn: '🇭🇰 Hard Peg (Hong Kong)',
      descriptionVi: 'Cố định tỷ giá cứng + Mở cửa vốn → Mất độc lập tiền tệ',
      descriptionEn: 'Hard currency peg + Open capital → Loss of monetary independence',
      params: {
        vietnamRate: 4.25, // BUỘC phải theo Fed (không độc lập)
        usRate: 4.25, // Phải bằng Fed
        capitalOpenness: 1.8, // Mở cửa hoàn toàn
        foreignReserves: 120.0, // Cần reserves RẤT cao để defend peg
      },
      goals: ['ers', 'kao'], // Đạt ERS + KAO, hy sinh MI
      severity: 'stable',
      warningVi: 'Mất hoàn toàn độc lập tiền tệ - phải theo Fed. Không thể điều chỉnh lãi suất theo nhu cầu nội địa.',
      warningEn: 'Complete loss of monetary independence - must follow Fed. Cannot adjust rates for domestic needs.',
    },
    {
      id: 'floating-open',
      icon: <Globe size={24} />,
      nameVi: '🇬🇧 Floating + Mở Cửa (UK/US)',
      nameEn: '🇬🇧 Floating + Open (UK/US)',
      descriptionVi: 'Độc lập tiền tệ + Mở cửa vốn → Tỷ giá float tự do',
      descriptionEn: 'Monetary independence + Open capital → Free floating exchange rate',
      params: {
        vietnamRate: 5.5, // Độc lập - có thể cao hơn Fed
        usRate: 4.25,
        capitalOpenness: 1.9, // Mở cửa hoàn toàn
        foreignReserves: 83.08, // Reserves bình thường (ít can thiệp)
      },
      goals: ['mi', 'kao'], // Đạt MI + KAO, hy sinh ERS
      severity: 'warning',
      warningVi: 'Tỷ giá biến động mạnh theo thị trường. NHNN không can thiệp, doanh nghiệp phải tự hedge rủi ro.',
      warningEn: 'Exchange rate fluctuates freely with market. No central bank intervention, businesses must hedge risks.',
    },
  ];

  return (
    <div className="scenario-presets">
      <h3 className="presets-title">
        {language === 'vi' ? '🎬 Kịch Bản Mô Phỏng' : '🎬 Simulation Scenarios'}
      </h3>
      <p className="presets-subtitle">
        {language === 'vi'
          ? 'Chọn một kịch bản để xem Việt Nam sẽ đối mặt với gì khi thay đổi chính sách'
          : 'Select a scenario to see what happens when Vietnam changes its policy'}
      </p>

      <div className="scenarios-grid">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            className={`scenario-card ${scenario.severity}`}
            onClick={() => onSelectScenario(scenario)}
          >
            <div className="scenario-header">
              <div className={`scenario-icon ${scenario.severity}`}>
                {scenario.icon}
              </div>
              <h4 className="scenario-name">
                {language === 'vi' ? scenario.nameVi : scenario.nameEn}
              </h4>
            </div>

            <p className="scenario-description">
              {language === 'vi' ? scenario.descriptionVi : scenario.descriptionEn}
            </p>

            <div className="scenario-goals">
              <span className="goals-label">
                {language === 'vi' ? 'Đạt được:' : 'Achieved:'}
              </span>
              <div className="goals-badges">
                {scenario.goals.includes('mi') && (
                  <span className="goal-badge mi">MI</span>
                )}
                {scenario.goals.includes('ers') && (
                  <span className="goal-badge ers">ERS</span>
                )}
                {scenario.goals.includes('kao') && (
                  <span className="goal-badge kao">KAO</span>
                )}
              </div>
            </div>

            {scenario.severity === 'crisis' && (
              <div className="crisis-indicator">
                ⚠️ {language === 'vi' ? 'KHỦNG HOẢNG' : 'CRISIS'}
              </div>
            )}

            {scenario.severity === 'warning' && (
              <div className="warning-indicator">
                ⚡ {language === 'vi' ? 'CẢNH BÁO' : 'WARNING'}
              </div>
            )}

            {scenario.warning && (
              <div className="scenario-warning">
                <small>
                  {language === 'vi' ? scenario.warningVi : scenario.warningEn}
                </small>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="presets-hint">
        💡 {language === 'vi'
          ? 'Sau khi chọn kịch bản, nhấn "Mô Phỏng" để xem kết quả chi tiết'
          : 'After selecting a scenario, click "Simulate" to see detailed results'}
      </div>
    </div>
  );
};

export default ScenarioPresets;

