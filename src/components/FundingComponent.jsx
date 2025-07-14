import React from 'react';

const FundingComponent = () => {
  return (
    <div className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16">
      <div className="mb-4 text-xs sm:text-sm text-gray-800">
        <span className="font-normal">Project ID:</span> 20002.04.410100,{' '}
        <span className="font-normal">Type:</span> EAC,{' '}
        <span className="font-normal">Version:</span> 3,{' '}
        <span className="font-normal">Status:</span> Working,{' '}
        <span className="font-normal">Period of Performance:</span> 05/22/2024 - 05/31/2025
      </div>
      <table className="w-full text-xs sm:text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 font-normal">Revenue</th>
            <th className="border p-2 font-normal">Funded</th>
            <th className="border p-2 font-normal">Budget</th>
            <th className="border p-2 font-normal">Unspecified</th>
            <th className="border p-2 font-normal">Percent</th>
            <th className="border p-2 font-normal">Budget</th>
            <th className="border p-2 font-normal">Percent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">Revenue</td>
            <td className="border p-2">541,565.20</td>
            <td className="border p-2">500,000.23</td>
            <td className="border p-2">41,564.97</td>
            <td className="border p-2">8.3%</td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
          </tr>
          <tr>
            <td className="border p-2">Cost</td>
            <td className="border p-2">541,565.20</td>
            <td className="border p-2">478,380.74</td>
            <td className="border p-2">63,184.46</td>
            <td className="border p-2">13.2%</td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
          </tr>
          <tr>
            <td className="border p-2">Profit</td>
            <td className="border p-2">0.00</td>
            <td className="border p-2">22,449.46</td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2">4.9%</td>
            <td className="border p-2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FundingComponent;
