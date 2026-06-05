import type { Asset } from '@/types'

export const sampleAssets: Asset[] = [
  {
    id: '1', name: 'MacBook Pro 16"', category: 'laptop', brand: 'Apple', model: 'MacBook Pro',
    serial_number: 'MBP2023001', purchase_price: 2499, purchase_date: '2023-01-15',
    status: 'assigned', assigned_to: 'john.doe@company.com', location: 'Office Floor 3',
    created_at: '2023-01-15T10:00:00Z', updated_at: '2023-01-15T10:00:00Z'
  },
  {
    id: '2', name: 'Dell Monitor 27"', category: 'monitor', brand: 'Dell', model: 'U2723QE',
    serial_number: 'DELL2023001', purchase_price: 599, purchase_date: '2023-02-01',
    status: 'active', location: 'Storage Room A',
    created_at: '2023-02-01T10:00:00Z', updated_at: '2023-02-01T10:00:00Z'
  },
  {
    id: '3', name: 'iPhone 15 Pro', category: 'phone', brand: 'Apple', model: 'iPhone 15 Pro',
    serial_number: 'IP152023001', purchase_price: 999, purchase_date: '2023-09-22',
    status: 'assigned', assigned_to: 'jane.smith@company.com',
    created_at: '2023-09-22T10:00:00Z', updated_at: '2023-09-22T10:00:00Z'
  },
  {
    id: '4', name: 'HP LaserJet Printer', category: 'printer', brand: 'HP', model: 'LaserJet Pro 4025n',
    serial_number: 'HP2023001', purchase_price: 449, purchase_date: '2023-03-10',
    status: 'maintenance', location: 'Office Floor 1',
    created_at: '2023-03-10T10:00:00Z', updated_at: '2023-03-10T10:00:00Z'
  },
  {
    id: '5', name: 'Lenovo ThinkPad X1', category: 'laptop', brand: 'Lenovo', model: 'ThinkPad X1 Carbon',
    serial_number: 'LEN2023001', purchase_price: 1899, purchase_date: '2023-04-05',
    status: 'active', location: 'Storage Room B',
    created_at: '2023-04-05T10:00:00Z', updated_at: '2023-04-05T10:00:00Z'
  }
]

export function getAssetsByCategory(assets: Asset[] = sampleAssets) {
  const categoryCount: Record<string, number> = {}
  assets.forEach(asset => {
    const category = asset.category || 'other'
    categoryCount[category] = (categoryCount[category] || 0) + 1
  })
  return Object.entries(categoryCount).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1), value
  }))
}

export function getAssetsByStatus(assets: Asset[] = sampleAssets) {
  const statusCount: Record<string, number> = {}
  assets.forEach(asset => {
    const status = asset.status || 'unknown'
    statusCount[status] = (statusCount[status] || 0) + 1
  })
  return Object.entries(statusCount).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1), value
  }))
}

export function getDashboardStats(assets: Asset[] = sampleAssets) {
  const total = assets.length
  const assigned = assets.filter(a => a.status === 'assigned').length
  const available = assets.filter(a => a.status === 'active').length
  const maintenance = assets.filter(a => a.status === 'maintenance').length
  const totalValue = assets.reduce((sum, asset) => sum + (asset.purchase_price || 0), 0)
  
  return { total, assigned, available, maintenance, totalValue }
}