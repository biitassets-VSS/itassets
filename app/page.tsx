'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Package, Shield, Users, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: Package,
    title: 'Asset Tracking',
    description: 'Complete lifecycle management of all IT assets with QR codes and real-time tracking.',
  },
  {
    icon: Users,
    title: 'Staff Management',
    description: 'Efficient staff onboarding and management with role-based access control.',
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Enterprise-grade security with audit trails and compliance reporting.',
  },
  {
    icon: TrendingUp,
    title: 'Analytics Dashboard',
    description: 'Comprehensive insights and analytics for informed decision making.',
  },
]

const benefits = [
  'Real-time asset tracking and monitoring',
  'Automated inspection reminders',
  'Complete audit trail and history',
  'Mobile-friendly responsive design',
  'Role-based access control',
  'Comprehensive reporting system',
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">Virtual Staffing Solution</h1>
                <p className="text-xs text-muted-foreground">IT Assets Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/admin/login">
                <Button variant="outline">Admin Login</Button>
              </Link>
              <Link href="/auth/staff/login">
                <Button>Staff Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Welcome to
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Virtual Staffing Solution
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Complete IT Assets Management System designed for modern organizations. 
                Track, manage, and optimize your IT assets with powerful analytics and automation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/admin/login">
                  <Button size="lg" className="w-full sm:w-auto">
                    Admin Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/auth/staff/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Staff Portal
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Animated Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mt-16"
            >
              <div className="relative max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 border">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="text-center">
                      <CardContent className="pt-6">
                        <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold">1,247</div>
                        <div className="text-sm text-muted-foreground">Total Assets</div>
                      </CardContent>
                    </Card>
                    <Card className="text-center">
                      <CardContent className="pt-6">
                        <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold">89</div>
                        <div className="text-sm text-muted-foreground">Active Staff</div>
                      </CardContent>
                    </Card>
                    <Card className="text-center">
                      <CardContent className="pt-6">
                        <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold">₹ 45L</div>
                        <div className="text-sm text-muted-foreground">Asset Value</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features for Modern Asset Management
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to manage your IT assets efficiently and effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-primary mb-4" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose Our Asset Management System?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Built specifically for Virtual Staffing Solution, our system provides comprehensive 
                asset management capabilities with enterprise-grade security and reliability.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-blue-100 mb-6">
                  Join hundreds of organizations already using our asset management system to 
                  streamline their operations and improve efficiency.
                </p>
                <div className="space-y-3">
                  <Link href="/auth/admin/login">
                    <Button variant="secondary" className="w-full">
                      Access Admin Dashboard
                    </Button>
                  </Link>
                  <Link href="/auth/staff/login">
                    <Button variant="outline" className="w-full bg-transparent border-white text-white hover:bg-white hover:text-gray-900">
                      Staff Login Portal
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              © Copyright Reserved AinodeArt 2026 - Virtual Staffing Solution IT Assets Management System
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}