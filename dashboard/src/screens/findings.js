import React, { useState, useEffect } from 'react';
import { Table, Spinner } from 'react-bootstrap'
import { getFindings } from '../api/scanResult'

const Findings = (props) => {
  const [findings, setFindings] = useState([])
  const [fetchingStatus, setFetchingStatus] = useState('not_started')
  useEffect(() => {
    findings.length === 0 && fetchingStatus === 'not_started' && getFindings(props.match.params.id)
      .then(findings => {
        if (findings.status === 200 && findings.data.success) {
          setFindings(findings.data.data.findings)
        }
        setFetchingStatus('fetched')
      })
    fetchingStatus === 'not_started' && setFetchingStatus('fetching')
  }, [findings.length, fetchingStatus, props.match.params.id])

  if (fetchingStatus !== 'fetched') {
    return <Spinner className="spinner" animation="border" variant="dark" />
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Rule ID</th>
          <th>Description</th>
          <th>Severity</th>
          <th>Path / Line Number</th>
        </tr>
      </thead>
      <tbody>
        {findings.length > 0 ? findings.map(({ ruleId, metadata, location }, index) => {
          return (
            <tr key={index}>
              <td>{ruleId}</td>
              <td>{metadata.description}</td>
              <td>{metadata.severity}</td>
              <td>
                <div>
                  {location.path}
                </div>
                <div>
                  {location.positions.begin.line}
                </div>
              </td>
            </tr>
          )
        }) :
          <tr>
            <td colSpan={4} className="text-center" >No data available.</td>
          </tr>}
      </tbody>
    </Table>
  )
}

export default Findings;