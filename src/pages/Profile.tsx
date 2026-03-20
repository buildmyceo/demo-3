/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, Package, MapPin, CreditCard, LogOut, Edit2, Plus, ChevronRight, CheckCircle2, Clock, Truck, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_ORDERS, MOCK_ADDRESSES } from '../constants';
import { formatCurrency, cn } from '../utils';

type Tab = 'personal' | 'orders' | 'addresses' | 'payment';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    gender: 'Male',
    dob: '1995-08-15',
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // In a real app, this would call an API
  };

  const tabs = [
    { id: 'personal', label: 'Personal Details', icon: User },
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-80">
          <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
            <div className="mb-8 flex flex-col items-center text-center">
              <div className="mb-4 h-24 w-24 overflow-hidden rounded-full bg-slate-100 ring-4 ring-slate-50">
                <img
                  src="https://picsum.photos/seed/user123/200/200"
                  alt="User Avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold text-slate-900">{userData.name}</h2>
              <p className="text-sm text-slate-500">{userData.email}</p>
            </div>

            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all",
                    activeTab === tab.id
                      ? "bg-black text-white shadow-lg shadow-black/20"
                      : "text-slate-600 hover:bg-slate-50 hover:text-black"
                  )}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && <ChevronRight size={16} className="ml-auto" />}
                </button>
              ))}
              <button className="mt-4 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-red-500 transition-all hover:bg-red-50">
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
            <AnimatePresence mode="wait">
              {activeTab === 'personal' && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">Personal Details</h2>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-200"
                      >
                        <Edit2 size={16} />
                        <span>Edit Profile</span>
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Full Name</label>
                      <input
                        disabled={!isEditing}
                        type="text"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-70"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Email Address</label>
                      <input
                        disabled={!isEditing}
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-70"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                      <input
                        disabled={!isEditing}
                        type="text"
                        value={userData.phone}
                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-70"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Gender</label>
                      <select
                        disabled={!isEditing}
                        value={userData.gender}
                        onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-70"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Date of Birth</label>
                      <input
                        disabled={!isEditing}
                        type="date"
                        value={userData.dob}
                        onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-70"
                      />
                    </div>

                    {isEditing && (
                      <div className="flex gap-4 md:col-span-2">
                        <button
                          type="submit"
                          className="rounded-xl bg-black px-8 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-95"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="rounded-xl bg-slate-100 px-8 py-3 text-sm font-bold text-slate-600 transition-all hover:bg-slate-200"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </form>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h2 className="mb-8 text-2xl font-bold text-slate-900">Order History</h2>
                  <div className="space-y-6">
                    {MOCK_ORDERS.map((order) => (
                      <div key={order.id} className="overflow-hidden rounded-2xl border border-slate-200">
                        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-4">
                          <div className="flex gap-8">
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Order ID</p>
                              <p className="text-sm font-bold text-slate-900">{order.id}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Date</p>
                              <p className="text-sm font-bold text-slate-900">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total</p>
                              <p className="text-sm font-bold text-slate-900">{formatCurrency(order.total)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow-sm ring-1 ring-slate-200">
                            {order.status === 'Delivered' ? (
                              <CheckCircle2 size={16} className="text-emerald-500" />
                            ) : order.status === 'Processing' ? (
                              <Clock size={16} className="text-black" />
                            ) : order.status === 'Shipped' ? (
                              <Truck size={16} className="text-orange-500" />
                            ) : (
                              <XCircle size={16} className="text-red-500" />
                            )}
                            <span className="text-xs font-bold text-slate-700">{order.status}</span>
                          </div>
                        </div>
                        <div className="p-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                              <div className="h-16 w-16 overflow-hidden rounded-lg bg-slate-100">
                                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                                <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                              </div>
                              <button className="rounded-lg bg-black px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-slate-800">
                                Buy Again
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'addresses' && (
                <motion.div
                  key="addresses"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">Saved Addresses</h2>
                    <button className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-slate-800">
                      <Plus size={18} />
                      <span>Add New</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {MOCK_ADDRESSES.map((addr) => (
                      <div key={addr.id} className={cn(
                        "relative flex flex-col gap-4 rounded-2xl p-6 ring-1 transition-all",
                        addr.isDefault ? "bg-slate-50 ring-black" : "bg-white ring-slate-200"
                      )}>
                        <div className="flex items-center justify-between">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                            {addr.type}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] font-bold text-emerald-600">Default Address</span>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{addr.name}</p>
                          <p className="text-sm text-slate-600">{addr.street}</p>
                          <p className="text-sm text-slate-600">{addr.city}, {addr.state} - {addr.zipCode}</p>
                        </div>
                        <div className="mt-auto flex gap-4 pt-4 border-t border-slate-100">
                          <button className="text-xs font-bold text-black hover:underline">Edit</button>
                          <button className="text-xs font-bold text-red-500 hover:underline">Remove</button>
                          {!addr.isDefault && (
                            <button className="ml-auto text-xs font-bold text-slate-400 hover:text-black">Set as Default</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">Payment Methods</h2>
                    <button className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-slate-800">
                      <Plus size={18} />
                      <span>Add New Card</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white shadow-xl">
                      <div className="mb-8 flex items-center justify-between">
                        <CreditCard size={32} className="text-white" />
                        <span className="text-sm font-bold italic">VISA</span>
                      </div>
                      <div className="mb-8">
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Card Number</p>
                        <p className="text-lg font-bold tracking-widest">•••• •••• •••• 4242</p>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Card Holder</p>
                          <p className="text-sm font-bold">JOHN DOE</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Expires</p>
                          <p className="text-sm font-bold">12/26</p>
                        </div>
                      </div>
                      {/* Decorative elements */}
                      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5"></div>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 p-6 text-slate-400 transition-colors hover:border-black hover:text-black">
                      <Plus size={32} className="mb-2" />
                      <span className="text-sm font-bold">Add a new payment method</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
