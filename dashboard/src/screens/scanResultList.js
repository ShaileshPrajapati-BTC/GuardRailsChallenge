import React, { useState, useEffect } from 'react';
import { Table, Badge, Spinner } from 'react-bootstrap'
import { getScanResults } from '../api/scanResult'
import { statusMapper, formatDateTime, statusColorMapper, checkNullValue } from '../utils/index'

const ScanResultList = (props) => {
  const [results, setResults] = useState([])
  const [fetchingStatus, setFetchingStatus] = useState('not_started')
  useEffect(() => {
    results.length === 0 && fetchingStatus === 'not_started' && getScanResults()
      .then(results => {
        if (results.status === 200 && results.data.success) {
          setResults(results.data.data)
        }
        setFetchingStatus('fetched')
      })
    fetchingStatus === 'not_started' && setFetchingStatus('fetching')
  }, [results.length, fetchingStatus])

  if (fetchingStatus !== 'fetched') {
    return <Spinner className="spinner" animation="border" variant="dark" />
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Repository Name</th>
          <th>Findings</th>
          <th>Queued At</th>
          <th>Scanning At</th>
          <th>Finished At</th>
        </tr>
      </thead>
      <tbody>
        {results.length > 0 ? results.map(({ _id, status, repositoryName, findings, queuedAt, scanningAt, finishedAt }) => {
          const badgeCount = (findings && findings.findings && findings.findings.length) || false
          return (
            <tr key={_id} >
              <td>{_id}</td>
              <td >
                <Badge variant={statusColorMapper[status]}>
                  {statusMapper[status]}
                </Badge>
              </td>
              <td>{repositoryName}</td>
              <td
                title={checkNullValue(badgeCount, "View findings")}
                className={checkNullValue(badgeCount, "findings")}
                onClick={() => badgeCount && props.history.push(`/scan_results/${_id}/findings`)}>
                {badgeCount && <Badge pill variant="dark">
                  {badgeCount}
                </Badge>}
              </td>
              <td>{formatDateTime(queuedAt)}</td>
              <td>{formatDateTime(scanningAt)}</td>
              <td>{formatDateTime(finishedAt)}</td>
            </tr>
          )
        }) :
          <tr>
            <td colSpan={7} className="text-center" >No data available.</td>
          </tr>}
      </tbody>
    </Table>
  )
}

export default ScanResultList;