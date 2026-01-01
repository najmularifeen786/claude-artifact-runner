import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, Package, Users, DollarSign, TrendingUp, Eye, CalendarIcon } from 'lucide-react';

const PeshawariDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [date, setDate] = useState(new Date());

  const stats = [
    { title: 'Total Sales', value: 'Rs 245,000', change: '+12%', icon: DollarSign, color: 'text-emerald-600' },
    { title: 'Active Orders', value: '34', change: '+8%', icon: Package, color: 'text-blue-600' },
    { title: 'Total Customers', value: '1,234', change: '+23%', icon: Users, color: 'text-purple-600' },
    { title: 'Revenue Growth', value: '18%', change: '+5%', icon: TrendingUp, color: 'text-amber-600' }
  ];

  const orders = [
    { id: 'ORD-001', customer: 'Ahmed Khan', model: 'Classic Leather', size: '42', price: 'Rs 3,500', status: 'Delivered', date: '2025-12-28' },
    { id: 'ORD-002', customer: 'Fatima Ali', model: 'Premium Handwoven', size: '38', price: 'Rs 4,200', status: 'Shipped', date: '2025-12-29' },
    { id: 'ORD-003', customer: 'Hassan Malik', model: 'Traditional Brown', size: '44', price: 'Rs 3,800', status: 'Pending', date: '2025-12-30' },
    { id: 'ORD-004', customer: 'Ayesha Hussain', model: 'Luxury Embroidered', size: '40', price: 'Rs 5,500', status: 'Shipped', date: '2025-12-30' },
    { id: 'ORD-005', customer: 'Imran Shah', model: 'Classic Leather', size: '43', price: 'Rs 3,500', status: 'Pending', date: '2025-12-31' },
    { id: 'ORD-006', customer: 'Zainab Raza', model: 'Premium Black', size: '39', price: 'Rs 4,000', status: 'Delivered', date: '2025-12-31' }
  ];

  const inventory = [
    { model: 'Classic Leather', stock: 45, reorder: 20, price: 'Rs 3,500' },
    { model: 'Premium Handwoven', stock: 12, reorder: 15, price: 'Rs 4,200' },
    { model: 'Traditional Brown', stock: 38, reorder: 20, price: 'Rs 3,800' },
    { model: 'Luxury Embroidered', stock: 8, reorder: 10, price: 'Rs 5,500' }
  ];

  const customers = [
    { name: 'Ahmed Khan', email: 'ahmed@example.com', orders: 5, spent: 'Rs 17,500' },
    { name: 'Fatima Ali', email: 'fatima@example.com', orders: 3, spent: 'Rs 12,600' },
    { name: 'Hassan Malik', email: 'hassan@example.com', orders: 4, spent: 'Rs 15,200' },
    { name: 'Ayesha Hussain', email: 'ayesha@example.com', orders: 2, spent: 'Rs 11,000' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100';
      case 'Shipped': return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'Pending': return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const filteredOrders = orders.filter(order =>
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-stone-800">Peshawari Chappal</h1>
            <p className="text-stone-600 mt-1">Admin Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-amber-600 to-orange-600 text-white">AK</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 bg-white border-stone-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-600 font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-stone-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-emerald-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-full bg-gradient-to-br ${stat.color === 'text-emerald-600' ? 'from-emerald-100 to-emerald-200' : stat.color === 'text-blue-600' ? 'from-blue-100 to-blue-200' : stat.color === 'text-purple-600' ? 'from-purple-100 to-purple-200' : 'from-amber-100 to-amber-200'}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList className="bg-white border border-stone-200 p-1">
            <TabsTrigger value="orders" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-orange-600 data-[state=active]:text-white">Orders</TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-orange-600 data-[state=active]:text-white">Inventory</TabsTrigger>
            <TabsTrigger value="customers" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-orange-600 data-[state=active]:text-white">Customers</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <Card className="p-6 bg-white border-stone-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-stone-800">Recent Orders</h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <Input
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64 border-stone-300"
                    />
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        Pick a Date
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="border border-stone-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-stone-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Order ID</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Customer</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Model</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Size</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Price</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order, index) => (
                      <tr key={order.id} className={index % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                        <td className="px-4 py-3 text-sm font-medium text-stone-900">{order.id}</td>
                        <td className="px-4 py-3 text-sm text-stone-700">{order.customer}</td>
                        <td className="px-4 py-3 text-sm text-stone-700">{order.model}</td>
                        <td className="px-4 py-3 text-sm text-stone-700">{order.size}</td>
                        <td className="px-4 py-3 text-sm font-medium text-stone-900">{order.price}</td>
                        <td className="px-4 py-3">
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="gap-2 text-amber-700 hover:text-amber-800 hover:bg-amber-50"
                                onClick={() => setSelectedOrder(order)}
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </Button>
                            </SheetTrigger>
                            <SheetContent className="w-[400px] sm:w-[540px]">
                              <SheetHeader>
                                <SheetTitle>Order Details</SheetTitle>
                                <SheetDescription>Complete information for {selectedOrder?.id}</SheetDescription>
                              </SheetHeader>
                              {selectedOrder && (
                                <div className="mt-6 space-y-6">
                                  <div className="space-y-4">
                                    <div className="flex justify-between items-start pb-4 border-b">
                                      <div>
                                        <p className="text-sm text-stone-500">Order ID</p>
                                        <p className="font-semibold text-stone-900">{selectedOrder.id}</p>
                                      </div>
                                      <Badge className={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</Badge>
                                    </div>
                                    
                                    <div>
                                      <p className="text-sm text-stone-500">Customer Name</p>
                                      <p className="font-medium text-stone-900">{selectedOrder.customer}</p>
                                    </div>
                                    
                                    <div>
                                      <p className="text-sm text-stone-500">Shoe Model</p>
                                      <p className="font-medium text-stone-900">{selectedOrder.model}</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <p className="text-sm text-stone-500">Size</p>
                                        <p className="font-medium text-stone-900">{selectedOrder.size}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-stone-500">Price</p>
                                        <p className="font-medium text-stone-900">{selectedOrder.price}</p>
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <p className="text-sm text-stone-500">Order Date</p>
                                      <p className="font-medium text-stone-900">{selectedOrder.date}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex gap-3 pt-4">
                                    <Button className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                                      Update Status
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                      Print Invoice
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </SheetContent>
                          </Sheet>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-4">
            <Card className="p-6 bg-white border-stone-200">
              <h2 className="text-xl font-semibold text-stone-800 mb-6">Inventory Status</h2>
              <div className="border border-stone-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-stone-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Model</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Stock</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Reorder Level</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Price</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                        <td className="px-4 py-3 text-sm font-medium text-stone-900">{item.model}</td>
                        <td className="px-4 py-3 text-sm text-stone-700">{item.stock}</td>
                        <td className="px-4 py-3 text-sm text-stone-700">{item.reorder}</td>
                        <td className="px-4 py-3 text-sm font-medium text-stone-900">{item.price}</td>
                        <td className="px-4 py-3">
                          <Badge className={item.stock <= item.reorder ? 'bg-red-100 text-red-800 hover:bg-red-100' : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100'}>
                            {item.stock <= item.reorder ? 'Low Stock' : 'In Stock'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-4">
            <Card className="p-6 bg-white border-stone-200">
              <h2 className="text-xl font-semibold text-stone-800 mb-6">Top Customers</h2>
              <div className="border border-stone-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-stone-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Total Orders</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Total Spent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-gradient-to-br from-amber-600 to-orange-600 text-white text-xs">
                                {customer.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium text-stone-900">{customer.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-stone-700">{customer.email}</td>
                        <td className="px-4 py-3 text-sm text-stone-700">{customer.orders}</td>
                        <td className="px-4 py-3 text-sm font-medium text-stone-900">{customer.spent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PeshawariDashboard;