import React from 'react';
import { Form, Button, FormGroup, Row, Col } from 'react-bootstrap'
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import TextArea from '../components/textarea'
import DateTime from '../components/datetime'
import Select from '../components/select'
import { postScanResult } from '../api/scanResult'
import { toast } from 'react-toastify'
import '../style/datetime.scss'

const options = [
  { value: 'queued', label: 'Queued' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'success', label: 'Success' },
  { value: 'failure', label: 'Failure' },
];
const AddScanResult = (props) => {
  return (
    <Formik
      initialValues={{ status: '', repositoryName: '', findings: '', queuedAt: '', scanningAt: '', finishedAt: '' }}
      validationSchema={Yup.object({
        status: Yup.string().required('Required'),
        repositoryName: Yup.string().required('Required'),
        findings: Yup.string().required('Required'),
        queuedAt: Yup.string().required('Required'),
        scanningAt: Yup.string().required('Required'),
        finishedAt: Yup.string().required('Required'),
      })}
      onSubmit={(values, actions) => {
        postScanResult({ ...values, 'findings': JSON.parse(values.findings), 'status': values.status.value })
          .then(result => {
            if (result.status === 200 && result.data.success === true) {
              toast.success('Scan result added successfully.');
              props.history.push(`/scanresultlist`)
            }
          })
      }}
    >
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, setFieldTouched }) => (
        <Form className="add-scan-form" onSubmit={handleSubmit}>
          <Row>
            <Col md="6">
              <FormGroup>
                <Form.Label>Status</Form.Label>
                <Select
                  value={values.status}
                  onChange={(item) => setFieldValue('status', item)}
                  options={options}
                  onMenuClose={() => setFieldTouched("status", true, true)}
                  error={errors.status}
                  touched={touched.status}
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <Form.Group>
                <Form.Label>Repository Name</Form.Label>
                <Field name="repositoryName" value={values.repositoryName} placeholder="Repository Name" as={Form.Control} />
                {touched.repositoryName && errors.repositoryName && <div className="text-red">{errors.repositoryName}</div>}
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group>
                <Form.Label>Findings</Form.Label>
                <Field name="findings" value={values.findings} placeholder="Findings" as={TextArea} />
                {touched.findings && errors.findings && <div className="text-red">{errors.findings}</div>}
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Label>Queued At</Form.Label>
              <DateTime
                onChange={(datetime) => setFieldValue("queuedAt", datetime)}
                error={errors.queuedAt}
                touched={touched.queuedAt} />
            </Col>
            <Col md="6">
              <Form.Label>Scanning At</Form.Label>
              <DateTime
                onChange={(datetime) => setFieldValue("scanningAt", datetime)}
                error={errors.scanningAt}
                touched={touched.scanningAt} />
            </Col>
            <Col md="6">
              <Form.Label>Finished At</Form.Label>
              <DateTime
                onChange={(datetime) => setFieldValue("finishedAt", datetime)}
                error={errors.finishedAt}
                touched={touched.finishedAt} />
            </Col>
            <Col md="6">
              <Button variant="dark" className="submit-btn" type="submit">Submit</Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}


export default AddScanResult;