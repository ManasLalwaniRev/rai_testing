// import React, { useEffect, useState } from 'react';

// const FundingComponent = ({ selectedProjectId }) => {
//   const [fundingData, setFundingData] = useState([
//     { label: 'Revenue', funding: '', budget: '', balance: '', percent: '' },
//     { label: 'Cost', funding: '', budget: '', balance: '', percent: '' },
//     { label: 'Profit', funding: '', budget: '', balance: '', percent: '' },
//   ]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `https://test-api-3tmq.onrender.com/Project/GetFunding/${selectedProjectId}`
//         );
//         let data = await response.json();

//         setFundingData([
//           { label: 'Revenue', ...data[0] },
//           { label: 'Cost', ...data[1] },
//           { label: 'Profit', ...data[2] },
//         ]);
//       } catch (error) {
//         setFundingData([
//           { label: 'Revenue', funding: '', budget: '', balance: '', percent: '' },
//           { label: 'Cost', funding: '', budget: '', balance: '', percent: '' },
//           { label: 'Profit', funding: '', budget: '', balance: '', percent: '' },
//         ]);
//       }
//     };

//     if (selectedProjectId) {
//       fetchData();
//     }
//   }, [selectedProjectId]);

//   return (
//     <div className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16">
//       <table className="w-full text-xs sm:text-sm border-collapse">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border p-2 font-normal"></th>
//             <th className="border p-2 font-normal">Funded</th>
//             <th className="border p-2 font-normal">Budget</th>
//             <th className="border p-2 font-normal">Balance</th>
//             <th className="border p-2 font-normal">Percent</th>
//           </tr>
//         </thead>
//         <tbody>
//           {fundingData.map((row) => (
//             <tr key={row.label}>
//               <td className="border p-2">{row.label}</td>
//               <td className="border p-2">{row.funding ?? ''}</td>
//               <td className="border p-2">{row.budget ?? ''}</td>
//               <td className="border p-2">{row.balance ?? ''}</td>
//               <td className="border p-2">{row.percent ?? ''}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FundingComponent;

import React, { useEffect, useState } from 'react';

const FundingComponent = ({ selectedProjectId }) => {
  const [fundingData, setFundingData] = useState([
    { label: 'Revenue', funding: '', budget: '', balance: '', percent: '' },
    { label: 'Cost', funding: '', budget: '', balance: '', percent: '' },
    { label: 'Profit', funding: '', budget: '', balance: '', percent: '' },
  ]);

  useEffect(() => {
    const roundTwoDecimals = (num) => {
      if (num === null || num === undefined || num === '') return '';
      const parsed = parseFloat(num);
      return isNaN(parsed) ? '' : parsed.toFixed(2);
    };

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://test-api-3tmq.onrender.com/Project/GetFunding/${selectedProjectId}`
        );
        let data = await response.json();

        const roundedData = data.slice(0, 3).map((item) => ({
          funding: roundTwoDecimals(item.funding),
          budget: roundTwoDecimals(item.budget),
          balance: roundTwoDecimals(item.balance),
          percent: roundTwoDecimals(item.percent),
        }));

        setFundingData([
          { label: 'Revenue', ...roundedData[0] },
          { label: 'Cost', ...roundedData[1] },
          { label: 'Profit', ...roundedData[2] },
        ]);
      } catch (error) {
        setFundingData([
          { label: 'Revenue', funding: '', budget: '', balance: '', percent: '' },
          { label: 'Cost', funding: '', budget: '', balance: '', percent: '' },
          { label: 'Profit', funding: '', budget: '', balance: '', percent: '' },
        ]);
      }
    };

    if (selectedProjectId) {
      fetchData();
    }
  }, [selectedProjectId]);

  return (
    <div className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16">
      <table className="w-full text-xs sm:text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 font-normal"></th>
            <th className="border p-2 font-normal">Funded</th>
            <th className="border p-2 font-normal">Budget</th>
            <th className="border p-2 font-normal">Balance</th>
            <th className="border p-2 font-normal">Percent</th>
          </tr>
        </thead>
        <tbody>
          {fundingData.map((row) => (
            <tr key={row.label}>
              <td className="border p-2">{row.label}</td>
              <td className="border p-2">{row.funding}</td>
              <td className="border p-2">{row.budget}</td>
              <td className="border p-2">{row.balance}</td>
              <td className="border p-2">{row.percent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FundingComponent;
