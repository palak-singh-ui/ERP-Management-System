
import React, { useEffect, useState } from "react";
import DashboardLayout from "../Components/DashboardLayout";
import axios from "axios";
import "../AdminPages/CSS/Fee.css";
import { Table } from "react-bootstrap";

const Fee = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedStudent, setSearchedStudent] = useState(null);
  const [allfee, setAllFee] = useState([]);
  const [searchedfee, setSearchedFee] = useState(null);
  const [selectedFee, setSelectedFee] = useState(null);
  const [dueFee, setDueFee] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, feeRes] = await Promise.all([
          axios.get("/JSONData/students.json"),
          axios.get("/JSONData/fee.json")
        ]);

        setStudents(
          Array.isArray(studentRes.data) ? studentRes.data : []
        );

        setAllFee(
          Array.isArray(feeRes.data) ? feeRes.data : []
        );
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Unable to load student or fee data.");
      }
    };

    fetchData();
  }, []);

  const getPaidAmount = (fee) =>
    Number(fee?.paidAmount ?? fee?.PaidAmount ?? 0);

  const getDueAmount = (fee) =>
    Math.max(
      0,
      Number(fee?.Amount ?? 0) - getPaidAmount(fee)
    );

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const query = search.trim().toLowerCase();

    if (!query) {
      setSearchedStudent(null);
      setSearchedFee(null);
      setSelectedFee(null);
      setError("Please enter Name, Phone, Email or Registration Number.");
      return;
    }

    const student = students.find((s) =>
      [
        s.Name,
        s.PhoneNumber,
        s.Email,
        s.RegNo
      ].some(
        (value) =>
          String(value ?? "").toLowerCase() === query
      )
    );

    if (!student) {
      setSearchedStudent(null);
      setSearchedFee(null);
      setSelectedFee(null);
      setDueFee("");
      setPaidAmount("");
      setError("Student not found. Please check the entered details.");
      return;
    }

    const fees = allfee.filter(
      (fee) => fee.RegNo === student.RegNo
    );

    setSearchedStudent(student);
    setSearchedFee(fees);
    setSelectedFee(null);
    setDueFee("");
    setPaidAmount("");
    setRemark("");
  };

  const handleSetPay = (fee) => {
    setSelectedFee(fee);
    // setDueFee(String(getDueAmount(fee)));
    // setPaidAmount("");
    // setRemark("");
    // setError("");
    // setSuccess("");
    setDueFee(String(Number(fee.Amount) - Number(fee.paidAmount)))
  };

  const handleCollectFee = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedFee) {
      setError("Please select a fee by clicking the Pay button.");
      return;
    }

    const payment = Number(paidAmount);
    const due = getDueAmount(selectedFee);

    if (
      paidAmount.trim() === "" ||
      !Number.isFinite(payment) ||
      payment <= 0
    ) {
      setError("Please enter a valid payment amount.");
      return;
    }

    if (payment > due) {
      setError("Payment cannot be greater than the due amount.");
      return;
    }

    const updatedFee = {
      ...selectedFee,
      paidAmount: getPaidAmount(selectedFee) + payment,
      Remark: remark
    };

    const matchesFee = (fee) =>
      fee === selectedFee ||
      (
        fee.RegNo === selectedFee.RegNo &&
        fee.FeeType === selectedFee.FeeType &&
        fee.PaymentType === selectedFee.PaymentType &&
        String(fee.FeeMonth ?? "") ===
        String(selectedFee.FeeMonth ?? "") &&
        String(fee._id ?? fee.id ?? "") ===
        String(selectedFee._id ?? selectedFee.id ?? "")
      );

    setAllFee((prev) =>
      prev.map((fee) =>
        matchesFee(fee) ? updatedFee : fee
      )
    );

    setSearchedFee((prev) =>
      (prev ?? []).map((fee) =>
        matchesFee(fee) ? updatedFee : fee
      )
    );

    setSelectedFee(updatedFee);
    setDueFee(String(getDueAmount(updatedFee)));
    setPaidAmount("");
    setSuccess("Fee collected successfully in the current session.");
  };

  const profileName = searchedStudent?.Name || "Student";

  const initials = profileName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const totalDue = (searchedfee ?? []).reduce(
    (sum, fee) => sum + getDueAmount(fee),
    0
  );



  const collectFee = () => {
    const option = {
      key: "rzp_test_6kz5nGEzi8uXRw",
      amount: Number(dueFee) * 100,
      currency: 'INR',
      name: "ERP-Portal",
      description: "Fee Payment",
      images: "/public/Images/logo.png",
      handler: function (response) {
        alert("Payment Successfully")
      },

      modal: {
        ondismiss: function (r) {
          console.log(r);
          alert("Payment failed")
        }
      },


      theme: {
        color: "black"
      }
    }


    const rzPay = new window.Razorpay(option);
    rzPay.open();
  }


  return (
    <DashboardLayout>
      <div className="collect-fee-page">
        <div className="collect-fee-heading">
          <div>
            <span className="collect-fee-eyebrow">
              STUDENT MANAGEMENT
            </span>
            <h1>Fee Collection</h1>
            <p>
              Search student details and manage fee collection.
            </p>
          </div><br />
        </div>

        <form
          className="collect-fee-search-card"
          onSubmit={handleSearch}
        >

          <div className="collect-fee-search-content">
            <label htmlFor="collect-fee-search">
              Search Student
            </label>

            <input
              className="collect-fee-search-input"
              type="text"
              placeholder="Enter Name, Phone Number, Email or Reg. No."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            className="collect-fee-search-button"
            type="submit"
          >
            Search Student
          </button>
        </form>

        {error && (
          <div
            className="collect-fee-alert collect-fee-alert-error"
            role="alert"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            className="collect-fee-alert collect-fee-alert-success"
            role="status"
          >
            {success}
          </div>
        )}

        {!searchedStudent && !error && (
          <div className="collect-fee-empty-state">
            <div className="collect-fee-empty-icon">⌕</div>
            <h2>Find a Student</h2>
            <p>
              Enter the student's phone number, email, name or
              registration number to view the profile and collect fees.
            </p>
          </div>
        )}

        {searchedStudent && (
          <div className="collect-fee-profile">
            <div className="collect-fee-profile-header">
              <div className="collect-fee-avatar">
                {initials || "ST"}
              </div>

              <div className="collect-fee-profile-title">
                <span className="collect-fee-profile-label">
                  STUDENT PROFILE
                </span>

                <h2>{searchedStudent.Name || "N/A"}</h2>

                <p>
                  Registration No: {searchedStudent.RegNo || "N/A"}
                </p>
              </div>

              <span className="collect-fee-status">
                Profile Found
              </span>
            </div>

            <div className="collect-fee-section">
              <h3 className="collect-fee-section-title">
                Personal Information
              </h3>

              <div className="collect-fee-info-grid">
                <div className="collect-fee-info-item">
                  <span>Registration Number</span>
                  <strong>{searchedStudent.RegNo || "N/A"}</strong>
                </div>

                <div className="collect-fee-info-item">
                  <span>Student Name</span>
                  <strong>{searchedStudent.Name || "N/A"}</strong>
                </div>

                <div className="collect-fee-info-item">
                  <span>Father's Name</span>
                  <strong>{searchedStudent.FatherName || "N/A"}</strong>
                </div>

                <div className="collect-fee-info-item">
                  <span>Phone Number</span>
                  <strong>{searchedStudent.PhoneNumber || "N/A"}</strong>
                </div>

                <div className="collect-fee-info-item">
                  <span>Current Class</span>
                  <strong>
                    {searchedStudent.currentClass ||
                      searchedStudent.CurrentClass ||
                      searchedStudent.Class ||
                      searchedStudent.LastClass ||
                      "N/A"}
                  </strong>
                </div>
              </div>
            </div>

            <div className="collect-fee-section">
              <h3 className="collect-fee-section-title">
                Fee Records
              </h3>

              <div>
                <Table responsive bordered hover>
                  <thead>
                    <tr>
                      <th>Reg No</th>
                      <th>Fee Name</th>
                      <th>Fee Type</th>
                      <th>Total Amount</th>
                      <th>Paid Amount</th>
                      <th>Due Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {searchedfee?.length > 0 ? (
                      searchedfee.map((fee, index) => {
                        const due = getDueAmount(fee);

                        return (
                          <tr key={fee._id ?? fee.id ?? index}>
                            <td>{fee.RegNo}</td>
                            <td>{fee.FeeType}</td>
                            <td>{fee.PaymentType} {fee.FeeMonth != null && ` (${fee.FeeMonth})`}
                            </td>
                            <td>
                              ₹{Number(fee.Amount ?? 0)}
                            </td>
                            <td>
                              ₹{getPaidAmount(fee)}
                            </td>
                            <td>₹{due}</td>
                            <td>
                              {due === 0 ? (
                                "No Dues"
                              ) : (
                                <button
                                  type="button" className="actionPay"
                                  onClick={() => handleSetPay(fee)}
                                >
                                  Pay Now
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="7">
                          No fee records found for this student.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>

            <form
              className="collect-fee-payment-section"
              onSubmit={handleCollectFee}
            >
              <h3 className="collect-fee-section-title">
                Fee Details
              </h3>

              <div className="collect-fee-payment-grid">
                <div className="collect-fee-field">
                  <label htmlFor="collect-fee-total">
                    Total Fee (₹)
                  </label>

                  <input
                    id="collect-fee-total"
                    type="number"
                    value={selectedFee?.Amount ?? ""}
                    placeholder="Select a fee"
                    disabled
                  />
                </div>

                <div className="collect-fee-field">
                  <label htmlFor="collect-fee-type">
                    Fee Name
                  </label>

                  <input
                    id="collect-fee-type"
                    type="text"
                    value={selectedFee?.FeeType ?? ""}
                    placeholder="Select a fee"
                    disabled
                  />
                </div>

                <div className="collect-fee-field">
                  <label htmlFor="collect-fee-payment-type">
                    Payment Type
                  </label>

                  <input
                    id="collect-fee-payment-type"
                    type="text"
                    value={selectedFee?.PaymentType ?? ""}
                    placeholder="Payment type"
                    disabled
                  />
                </div>

                <div className="collect-fee-field">
                  <label htmlFor="collect-fee-previous-paid">
                    Paid Amount (₹)
                  </label>

                  <input
                    id="collect-fee-previous-paid"
                    type="number"
                    value={
                      selectedFee ? getPaidAmount(selectedFee) : ""
                    }
                    placeholder="Previously paid"
                    disabled
                  />
                </div>

                <div className="collect-fee-field">
                  <label htmlFor="collect-fee-due">
                    Due Amount (₹)
                  </label>

                  <input
                    id="collect-fee-due"
                    type="number"
                    value={dueFee}
                    placeholder="Select a fee"
                    disabled
                  />
                </div>

                <div className="collect-fee-field">
                  <label htmlFor="collect-fee-paid">
                    Collect Amount (₹)
                  </label>

                  <input
                    id="collect-fee-paid"
                    type="number"
                    min="0.01"
                    step="0.01"
                    max={dueFee}
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(e.target.value)}
                    placeholder="Enter amount to collect"
                    disabled={!selectedFee || Number(dueFee) <= 0}
                    required
                  />
                </div>

                <div className="collect-fee-field collect-fee-field-full">
                  <label htmlFor="collect-fee-remark">
                    Remark
                  </label>

                  <textarea
                    id="collect-fee-remark"
                    rows="3"
                    placeholder="Enter payment remark..."
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    disabled={!selectedFee}
                  />
                </div>
              </div>

              <div className="collect-fee-payment-footer">
                <div className="collect-fee-due-summary">
                  <span>Remaining Due</span>

                  <strong>
                    ₹
                    {Math.max(
                      0,
                      (Number(dueFee) || 0) -
                      (Number(paidAmount) || 0)
                    ).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </strong>
                </div>

                <button
                  className="collect-fee-submit-button"
                  onClick={collectFee}>
                  Collect Fee
                </button>
              </div>
            </form>
          </div>

        )}

      </div>
    </DashboardLayout>
  );
};

export default Fee;
