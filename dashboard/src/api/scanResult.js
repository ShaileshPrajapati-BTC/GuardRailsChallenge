import client from './client'

export const getScanResults = () => client.get(`/api/scanResults`)

export const getFindings = (id) => client.get(`/api/scanResults/${id}`)

export const postScanResult = (body) => client.post('/api/scanResults', body)