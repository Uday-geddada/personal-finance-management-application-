import React, { useState } from 'react';
import { Plus, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { mockBudgets } from '../data/mockData';

const Budgets: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const filteredBudgets = mockBudgets.filter(budget => budget.period === selectedPeriod);
  
  const totalBudget = filteredBudgets.reduce((sum, budget) => sum + budget.limit, 0);
  const totalSpent = filteredBudgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalRemaining = totalBudget - totalSpent;

  const getBudgetStatus = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 100) return { status: 'over', color: 'danger', icon: AlertTriangle };
    if (percentage >= 80) return { status: 'warning', color: 'warning', icon: AlertTriangle };
    return { status: 'good', color: 'success', icon: CheckCircle };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Budgets</h1>
          <p className="text-gray-600 mt-1">Plan and track your spending by category</p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
          <Plus className="w-4 h-4" />
          <span>Create Budget</span>
        </button>
      </div>

      {/* Period Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Budget Period:</span>
          <div className="flex space-x-2">
            {['weekly', 'monthly', 'yearly'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedPeriod === period
                    ? 'bg-primary-100 text-primary-700 border border-primary-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">${totalBudget.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-danger-600">${totalSpent.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">
                {Math.round((totalSpent / totalBudget) * 100)}% of budget
              </p>
            </div>
            <div className="w-12 h-12 bg-danger-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-danger-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Remaining</p>
              <p className={`text-2xl font-bold ${totalRemaining >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                ${Math.abs(totalRemaining).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {totalRemaining >= 0 ? 'Under budget' : 'Over budget'}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              totalRemaining >= 0 ? 'bg-success-100' : 'bg-danger-100'
            }`}>
              <TrendingUp className={`w-6 h-6 ${totalRemaining >= 0 ? 'text-success-600' : 'text-danger-600'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Budget Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBudgets.map((budget) => {
          const percentage = (budget.spent / budget.limit) * 100;
          const remaining = budget.limit - budget.spent;
          const budgetStatus = getBudgetStatus(budget.spent, budget.limit);
          const StatusIcon = budgetStatus.icon;

          return (
            <div key={budget.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${budgetStatus.color}-100`}>
                    <StatusIcon className={`w-5 h-5 text-${budgetStatus.color}-600`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{budget.category}</h3>
                    <p className="text-sm text-gray-500 capitalize">{budget.period} budget</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Remaining</p>
                  <p className={`text-lg font-bold ${remaining >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                    ${Math.abs(remaining).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    ${budget.spent.toLocaleString()} of ${budget.limit.toLocaleString()}
                  </span>
                  <span className={`text-sm font-medium ${
                    percentage >= 100 ? 'text-danger-600' : 
                    percentage >= 80 ? 'text-warning-600' : 'text-success-600'
                  }`}>
                    {Math.round(percentage)}%
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      percentage >= 100 ? 'bg-danger-500' : 
                      percentage >= 80 ? 'bg-warning-500' : 'bg-success-500'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>

                {percentage >= 100 && (
                  <div className="flex items-center space-x-2 text-danger-600 bg-danger-50 p-2 rounded-lg">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-medium">Budget exceeded by ${(budget.spent - budget.limit).toLocaleString()}</span>
                  </div>
                )}

                {percentage >= 80 && percentage < 100 && (
                  <div className="flex items-center space-x-2 text-warning-600 bg-warning-50 p-2 rounded-lg">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-medium">Approaching budget limit</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Budget Prompt */}
      {filteredBudgets.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No budgets for this period</h3>
          <p className="text-gray-600 mb-6">Create your first {selectedPeriod} budget to start tracking your spending.</p>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-colors duration-200">
            <Plus className="w-4 h-4" />
            <span>Create Budget</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Budgets;