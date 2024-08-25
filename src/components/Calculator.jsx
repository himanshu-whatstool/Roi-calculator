import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FileDownload } from '@mui/icons-material';
import jsPDF from 'jspdf';
import { Form, Input } from 'antd';


function Calculator() {

  const [invoiceSlider, setInvoiceSlider] = useState(0)
  const [teamSlider, setTeamSlider] = useState(0)
  const [salaryInput, setSalaryInput] = useState(50000)

  const invoiceRanges = [50000, 200000, 500000, 1000000, 2000000];
  const teamRanges = [10, 15, 20, 25, 30, 35, 40, 45, 50];

  const [formValues, setFormValues] = useState({ username: '', companyName: '', email: '' });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleTeamSlider = (value) => {
    setTeamSlider(Number(value))
  }

  const handleInvoiceSlider = (value) => {
    setInvoiceSlider(Number(value))
  }

  const handleSalaryInput = (value) => {
    setSalaryInput(Number(value))
  }

  const handleFormChange = (changedValues, allValues) => {
    setFormValues(allValues);
  };

  const calculateROI = () => {
    const teamSize = parseInt(teamRanges[teamSlider])
    const invoicesPerYear = parseInt(invoiceRanges[invoiceSlider])
    const salary = parseFloat(salaryInput)
    const roi = teamSize * salary

    let cost = 0

    if (invoicesPerYear > 0 && invoicesPerYear <= 50000) {
      const teamten = roi / 10
      cost = (teamten * invoicesPerYear) / 12
    } else if (invoicesPerYear > 50000 && invoicesPerYear <= 200000) {
      cost = (roi / 5) / 12
    } else if (invoicesPerYear > 200000 && invoicesPerYear <= 500000) {
      cost = (roi / 2) / 12
    } else if (invoicesPerYear > 500000 && invoicesPerYear <= 1000000) {
      cost = (roi / 1.5) / 12
    } else if (invoicesPerYear > 1000000) {
      cost = roi / 12
    }
    return cost.toFixed(2)
  }

  const downloadPDF = () => {
    const doc = new jsPDF()

    doc.text('ROI Calculator Report', 20, 20)
    doc.text(`Invoices per year: ${invoiceRanges[invoiceSlider]}`, 20, 30);
    doc.text(`AP Team size: ${teamRanges[teamSlider]}`, 20, 40);
    doc.text(`Average AP Accountant Salary/year: $${salaryInput}`, 20, 50);
    doc.text(`Projected Savings at 60% touchless processing: $${calculateROI()}`, 20, 60);
    doc.text(`Projected ROI: ${(calculateROI() * 100 / salaryInput).toFixed(2)}%`, 20, 70);

    doc.save('ROI_Calculator_Report.pdf');
  }

  useEffect(() => {
    document.getElementById('invoicerange').innerText = invoiceRanges[invoiceSlider]
  }, [invoiceSlider])

  useEffect(() => {
    // Check if all fields are filled and valid
    const { username, companyName, email } = formValues;
    setIsFormValid(username !== '' && companyName !== '' && email !== '' && salaryInput > 0);
  }, [formValues, salaryInput]);

  return (
    <section>
      <div style={{ height: '85px', background: '#fafafa' }}>
        <div className='d-flex float-end'>
          <button disabled={!isFormValid} className='btn btn-sm me-5 mt-4' onClick={downloadPDF} style={{ border: '1px solid #616874', margin: '20px 0', padding: '7px 28px', borderRadius: '22px' }}><FileDownload /> Download PDF</button>
        </div>
      </div>
      <Container className='mt-4'>
        <Row>
          <Col xxl={8} xl={8} lg={8} md={6} sm={12} xs={12}>
            <section>
              <div style={{ margin: '35px 0' }}>
                <label className='form-label fw-bold w-75'>Invoices per year</label>
                <input className='form-range w-75' value={invoiceSlider} onChange={(e) => handleInvoiceSlider(e.target.value)} type="range" min="0" max="4" step="1" />
                <small className='ms-4' id='invoicerange' style={{ padding: '5px 10px', background: '#FFF1F1', borderRadius: '10px' }}>{invoiceRanges[invoiceSlider]}</small>
                <br />
                <span>50000</span>
                <span style={{ marginLeft: '12%' }}>200000</span>
                <span style={{ marginLeft: '12%' }}>500000</span>
                <span style={{ marginLeft: '12%' }}>1000000</span>
                <span style={{ marginLeft: '12%' }}>2000000</span>
              </div>

              <div style={{ margin: '35px 0' }}>
                <label className='form-label fw-bold w-75'>AP Team size</label>
                <input value={teamSlider} onChange={(e) => handleTeamSlider(e.target.value)} className='form-range w-75' type="range" min="0" max="8" step="1" />
                <small className='ms-4' style={{ padding: '5px 10px', background: '#FFF1F1', borderRadius: '10px' }}>{teamRanges[teamSlider]}</small>
                <br />
                <span>10</span>
                <span style={{ marginLeft: '7%' }}>15</span>
                <span style={{ marginLeft: '7%' }}>20</span>
                <span style={{ marginLeft: '7%' }}>25</span>
                <span style={{ marginLeft: '7%' }}>30</span>
                <span style={{ marginLeft: '7%' }}>35</span>
                <span style={{ marginLeft: '7%' }}>40</span>
                <span style={{ marginLeft: '7%' }}>45</span>
                <span style={{ marginLeft: '7%' }}>50</span>
              </div>
              <div className='d-flex' style={{ margin: '35px 0' }}>
                <label htmlFor="salaryId" className='form-label fw-bold'>Average AP Accountant Salary/year (USD)</label>
                <input value={salaryInput} onChange={(e) => handleSalaryInput(e.target.value)} className='form-control w-25 ms-4' type="number" id="salaryId" />
              </div>
              <div>
                <p className='fw-bold' style={{ fontSize: '19px' }}>Projected Savings at 60% touchless processing with Cherrywork AP Automation: <span className='text-success'>${calculateROI()}</span> </p>
                <p className='fw-bold pt-2' style={{ fontSize: '19px' }}>Projected ROI at 60% touchless processing with Cherrywork AP Automation: <span>{(calculateROI() * 100 / salaryInput).toFixed(2)}%</span></p>
              </div>
            </section>
          </Col>
          <Col xxl={4} xl={4} lg={4} md={6} sm={12} xs={12} style={{ marginTop: '40px' }}>
            <Form name="basic" labelCol={{ span: 8, }} wrapperCol={{ span: 16, }} style={{ maxWidth: 600, }} initialValues={{ remember: true, }} onValuesChange={handleFormChange} autoComplete="on">
              <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!', },]} >
                <Input />
              </Form.Item>

              <Form.Item label="Company Name" name="Company Name" rules={[{ required: true, message: 'Please input your Company Name!', },]} >
                <Input />
              </Form.Item>

              <Form.Item name='email' label="Email" rules={[{ required: true, type: 'email', message: 'The input is not valid E-mail!', },]}    >
                <Input />
              </Form.Item>

            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Calculator











