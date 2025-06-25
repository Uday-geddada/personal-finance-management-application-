import React from 'react';
import { Plus, TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { mockInvestments } from '../data/mockData';

const Investments: React.FC = () => {
  const totalValue = mockInvestments.reduce((sum, inv) => sum + (inv.shares * inv.currentPrice), 0);
  const totalCost = mockInvestments.reduce((sum, inv) => sum + (inv.shares * inv.purchasePrice), 0);
  const totalGainLoss = totalValue - totalCost;
  const totalGainLossPercentage = ((totalGainLoss / totalCost) * 100);

  const getGainLoss = (investment: any) => {
    const currentValue = investment.shares * investment.currentPrice;
    const purchaseValue = investment.shares * investment.purchasePrice;
    const gainLoss = currentValue - purchaseValue;
    const percentage = ((gainLoss / purchaseValue) * 100);
    return { gainLoss, percentage };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Investments</h1>
          <p className="text-gray-600 mt-1">Track your investment portfolio performance</p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
          <Plus className="w-4 h-4" />
          <span>Add Investment</span>
        </button>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Cost</p>
              <p className="text-2xl font-bold text-gray-900">${totalCost.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Gain/Loss</p>
              <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                {totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toLocaleString()}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              totalGainLoss >= 0 ? 'bg-success-100' : 'bg-danger-100'
            }`}>
              {totalGainLoss >= 0 ? 
                <TrendingUp className="w-6 h-6 text-success-600" /> : 
                <TrendingDown className="w-6 h-6 text-danger-600" />
              }
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Return %</p>
              <p className={`text-2xl font-bold ${totalGainLossPercentage >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                {totalGainLossPercentage >= 0 ? '+' : ''}{totalGainLossPercentage.toFixed(1)}%
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              totalGainLossPercentage >= 0 ? 'bg-success-100' : 'bg-danger-100'
            }`}>
              {totalGainLossPercentage >= 0 ? 
                <TrendingUp className="w-6 h-6 text-success-600" /> : 
                <TrendingDown className="w-6 h-6 text-danger-600" />
              }
            </div>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Holdings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Symbol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shares
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market Value
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gain/Loss
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Return %
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockInvestments.map((investment) => {
                const { gainLoss, percentage } = getGainLoss(investment);
                const marketValue = investment.shares * investment.currentPrice;
                
                return (
                  <tr key={investment.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-sm font-bold text-primary-600">
                            {investment.symbol.charAt(0)}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {investment.symbol}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {investment.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      {investment.shares}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      ${investment.currentPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      ${marketValue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-1">
                        {gainLoss >= 0 ? 
                          <TrendingUp className="w-4 h-4 text-success-600" /> : 
                          <TrendingDown className="w-4 h-4 text-danger-600" />
                        }
                        <span className={gainLoss >= 0 ? 'text-success-600' : 'text-danger-600'}>
                          {gainLoss >= 0 ? '+' : ''}${gainLoss.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <span className={percentage >= 0 ? 'text-success-600' : 'text-danger-600'}>
                        {percentage >= 0 ? '+' : ''}{percentage.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Investment Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
          <div className="space-y-3">
            {mockInvestments
              .map(inv => ({ ...inv, ...getGainLoss(inv) }))
              .sort((a, b) => b.percentage - a.percentage)
              .slice(0, 3)
              .map((investment) => (
                <div key={investment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-600">
                        {investment.symbol.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{investment.symbol}</p>
                      <p className="text-xs text-gray-500">{investment.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${investment.percentage >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                      {investment.percentage >= 0 ? '+' : ''}{investment.percentage.toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-500">
                      {investment.percentage >= 0 ? '+' : ''}${investment.gainLoss.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Allocation</h3>
          <div className="space-y-3">
            {mockInvestments.map((investment) => {
              const marketValue = investment.shares * investment.currentPrice;
              const allocation = (marketValue / totalValue) * 100;
              
              return (
                <div key={investment.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{investment.symbol}</span>
                    <span className="text-sm text-gray-500">
                      {allocation.toFixed(1)}% (${marketValue.toLocaleString()})
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${allocation}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Investment Prompt */}
      {mockInvestments.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No investments tracked</h3>
          <p className="text-gray-600 mb-6">Start tracking your investment portfolio to monitor performance and gains.</p>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-colors duration-200">
            <Plus className="w-4 h-4" />
            <span>Add Investment</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Investments;