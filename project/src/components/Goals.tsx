import React from 'react';
import { Plus, Target, Calendar, TrendingUp } from 'lucide-react';
import { mockGoals } from '../data/mockData';

const Goals: React.FC = () => {
  const totalGoalsValue = mockGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalSaved = mockGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const averageProgress = mockGoals.reduce((sum, goal) => sum + (goal.currentAmount / goal.targetAmount), 0) / mockGoals.length * 100;

  const getTimeRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: 'Overdue', color: 'text-danger-600' };
    if (diffDays === 0) return { text: 'Due today', color: 'text-warning-600' };
    if (diffDays === 1) return { text: '1 day left', color: 'text-warning-600' };
    if (diffDays <= 30) return { text: `${diffDays} days left`, color: 'text-warning-600' };
    if (diffDays <= 90) return { text: `${diffDays} days left`, color: 'text-primary-600' };
    return { text: `${diffDays} days left`, color: 'text-gray-600' };
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-success-500';
    if (percentage >= 50) return 'bg-primary-500';
    if (percentage >= 25) return 'bg-warning-500';
    return 'bg-gray-400';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Goals</h1>
          <p className="text-gray-600 mt-1">Track your progress towards financial milestones</p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
          <Plus className="w-4 h-4" />
          <span>Add Goal</span>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Goal Value</p>
              <p className="text-2xl font-bold text-gray-900">${totalGoalsValue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Saved</p>
              <p className="text-2xl font-bold text-success-600">${totalSaved.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">
                {Math.round((totalSaved / totalGoalsValue) * 100)}% of total goals
              </p>
            </div>
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Progress</p>
              <p className="text-2xl font-bold text-primary-600">{Math.round(averageProgress)}%</p>
              <p className="text-sm text-gray-500 mt-1">Across all goals</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockGoals.map((goal) => {
          const percentage = (goal.currentAmount / goal.targetAmount) * 100;
          const remaining = goal.targetAmount - goal.currentAmount;
          const timeRemaining = getTimeRemaining(goal.deadline);
          const progressColor = getProgressColor(percentage);

          return (
            <div key={goal.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
                    <p className="text-sm text-gray-500">{goal.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Target</p>
                  <p className="text-lg font-bold text-gray-900">${goal.targetAmount.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      ${goal.currentAmount.toLocaleString()} saved
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${progressColor}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Goal Details */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Remaining</p>
                    <p className="text-lg font-semibold text-gray-900">${remaining.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Deadline</p>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(goal.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <p className={`text-xs font-medium ${timeRemaining.color}`}>
                      {timeRemaining.text}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
                    Add Money
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    Edit
                  </button>
                </div>

                {/* Progress Insights */}
                {percentage >= 100 && (
                  <div className="bg-success-50 border border-success-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-success-600" />
                      <span className="text-sm font-medium text-success-800">Goal achieved! 🎉</span>
                    </div>
                  </div>
                )}

                {percentage >= 75 && percentage < 100 && (
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-primary-600" />
                      <span className="text-sm font-medium text-primary-800">Almost there! Keep it up!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Goal Prompt */}
      {mockGoals.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No financial goals yet</h3>
          <p className="text-gray-600 mb-6">Set your first financial goal to start tracking your progress towards important milestones.</p>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-colors duration-200">
            <Plus className="w-4 h-4" />
            <span>Create Goal</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Goals;