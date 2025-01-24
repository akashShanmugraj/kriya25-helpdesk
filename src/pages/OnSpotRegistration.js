import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Dropdown from "../components/Dropdown";
import Layout from "../components/Layout";
import Row from "../components/Row";
import Inputfield from "../components/TextInput";
import colleges from "./CollegeList.js";
import departments from "./DepartmentList";
import Button from "../components/Button";
import { generateOnSpotPaymentURL, registerOnSpot } from "../API/calls";
import { useOnSpotRegistration } from "../context/OnSpotRegistrationContext";
import Select from "react-select";

const OnSpotRegistration = () => {
  const [otherCollege, setOtherCollege] = useState("");
  const [otherDept, setOtherDept] = useState("");

  const [isOther, setIsOther] = useState(false);
  const [isOtherDept, setIsOtherDept] = useState(false);

  const { urlState, detailsState, statusState } = useOnSpotRegistration();

  const PSG_COLLEGE = `PSG College of Technology (Autonomous), Peelamedu, Coimbatore District 641004`;

  const defaultFormData = {
    email: "",
    name: "",
    password: "Welcome@123",
    isPSGStudent: false,
    college: "",
    department: "",
    year: 1,
    phone: "",
    accomodation: "No",
    verified: true,
    isPaid: false,
  }

  const defaultPaymentData = {
    kriyaId: "",
    email: "",
    name: "",
    fee: 200,
  }

  const [formData, setFormData] = useState({
    ...defaultFormData
  });

  const [paymentFormData, setPaymentFormData] = useState({
    ...defaultPaymentData
  })

  const [url, setUrl] = urlState;
  const [status, setStatus] = statusState;
  const [details, setDetails] = detailsState;

  const clearFormData = () => {
    setFormData({ ...defaultFormData });
  }

  const clearPaymentFormData = () => {
    setPaymentFormData({ ...defaultPaymentData });
    setUrl(null);
    setStatus(null);
  }

  const getFee = (college) => {
    return college === PSG_COLLEGE ? 200 : 250
  }

  const getIsPSG = (college) => {
    return college === PSG_COLLEGE
  }

  const register = async () => {
    if (formData.college === "Other") {
      formData.college = otherCollege;
    }

    if (formData.department === "Other") {
      formData.department = otherDept;
    }

    return toast.promise(registerOnSpot({
      ...formData,
      isPSGStudent: getIsPSG(formData.college)
    }), {
      loading: "Registering...",
      success: (res) => {
        const user = res.data.user;
        clearFormData();
        setPaymentFormData({ ...paymentFormData, email: user.email, name: user.name, kriyaId: user.kriyaId, fee: getFee(user.college) });
        return `Successfully registered user ${res.data.user.name}`
      },
      error: (err) => {
        if (err.response.status === 409) {
          const user = err.response.data.user;
          if (user.isPaid) {
            return "User as already registered and paid";
          }
          setPaymentFormData({ ...paymentFormData, email: user.email, name: user.name, kriyaId: user.kriyaId, fee: getFee(user.college) });
          return "User as already registered continue to generate payment URL";
        }
        return err.response.data.error;
      }
    })
  };

  const generatePaymentURL = async () => {
    return toast.promise(generateOnSpotPaymentURL(paymentFormData), {
      loading: "Generating...",
      success: (res) => {
        setUrl(res.data.url);
        console.log(res.data.url);
        return "Please Scan the QR Code to Pay";
      },
      error: (err) => {
        console.log(err);
        return err.response.data.error;
      }
    });
  }

  const selectStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      border: "2px solid #E5E7EB",
      borderRadius: "0.5rem",
      padding: "0.25rem 0.5rem",
    }),
  };

  const handleCollegeChange = (e) => {
    setFormData({
      ...formData,
      college: e.value,
      isPSGStudent: e.value === PSG_COLLEGE,
    });
  };

  const handleDeptChange = (e) => {
    setFormData({ ...formData, department: e.value });
  };

  return (
    <Layout>
      <Layout className={"space-y-4 px-4 lg:px-0"} title={"Register On Spot"}>
        <Row>
          <Inputfield
            title="Name"
            valueState={[
              formData.name,
              (val) => setFormData({ ...formData, name: val }),
            ]}
          />
          <Inputfield
            title="Email"
            valueState={[
              formData.email,
              (val) => setFormData({ ...formData, email: val }),
            ]}
          />
        </Row>
        <div className="">
          <label className="z-30 p-2">
            College/University
          </label>

          <Select
            styles={selectStyles}
            className="z-30 flex-1"
            options={colleges.map((college) => {
              return {
                value: college,
                label: college,
              };
            })}
            isDisabled={isOther}
            onChange={handleCollegeChange}
          />
          <div className="flex space-x-2 pl-2 mt-2">
            <input
              type="checkbox"
              checked={isOther}
              onClick={(e) => {
                if (!isOther) setFormData({ ...formData, college: "Other" });
                else setFormData({ ...formData, college: "" });
                setIsOther(!isOther);
              }}
            />
            <p>Your college is not listed above </p>
          </div>
        </div>
        {formData.college === "Other" && (
          <Inputfield
            title="College/University Name"
            placeholder="Enter your college/university name"
            className=""
            valueState={[otherCollege, setOtherCollege]}
          />
        )}
        <Row>
          <div className="w-full lg:w-2/3">
            <div className="">
              <label className="z-30 p-2">
                Department
              </label>

              <Select
                styles={selectStyles}
                className="z-20 flex-1"
                options={departments.map((dept) => {
                  return {
                    value: dept,
                    label: dept,
                  };
                })}
                isDisabled={isOtherDept}
                onChange={handleDeptChange}
              />
              <div className="flex space-x-2 pl-2 mt-2">
                <input
                  type="checkbox"
                  checked={isOtherDept}
                  onClick={(e) => {
                    if (!isOtherDept) setFormData({ ...formData, department: "Other" });
                    else setFormData({ ...formData, department: "" });
                    setIsOtherDept(!isOtherDept);
                  }}
                />
                <p>Your department is not listed above </p>
              </div>
            </div>
            {formData.department === "Other" && (
              <Inputfield
                title="Department Name"
                placeholder="Enter your department name"
                className="pt-2"
                valueState={[otherDept, setOtherDept]}
              />
            )}
          </div>
          <Dropdown
            title="Year"
            options={[1, 2, 3, 4, 5]}
            valueState={[
              formData.year,
              (val) => setFormData({ ...formData, year: val }),
            ]}
            className="w-full lg:w-1/3"
          />
        </Row>
        <Row>
          <Inputfield
            title="Phone Number"
            valueState={[
              formData.phone,
              (val) => setFormData({ ...formData, phone: val }),
            ]}
          />
          <Dropdown
            title="Require Accomodation ?"
            options={["Yes", "No"]}
            valueState={[
              formData.accomodation,
              (val) => setFormData({ ...formData, accomodation: val }),
            ]}
          />
        </Row>
        <Row className="pt-8">
          <Button text="Register" handleClick={(e) => {
            register();
          }} />
          <Button text="Cancel" outlined handleClick={(e) => {
            clearFormData();
          }} />
        </Row>
      </Layout>
      <Layout className={"space-y-4 px-4 lg:px-0"} title={"Payment URL Generation"}>
        <Row>
          <Inputfield
            title="Kriya ID"
            isDisabled
            valueState={[
              paymentFormData.kriyaId,
              (val) => setPaymentFormData({ ...paymentFormData, kriyaId: val }),
            ]}
          />
          <Inputfield
            title="Email"
            isDisabled
            valueState={[
              paymentFormData.email,
              (val) => setPaymentFormData({ ...paymentFormData, email: val }),
            ]}
          />
        </Row>
        <Row>
          <Inputfield
            title="Name"
            isDisabled
            valueState={[
              paymentFormData.name,
              (val) => setPaymentFormData({ ...paymentFormData, name: val }),
            ]}
          />
          <Inputfield
            title="Fee"
            isDisabled
            valueState={[
              paymentFormData.fee,
              (val) => setPaymentFormData({ ...paymentFormData, fee: val }),
            ]}
          />
        </Row>
        <Row>
          <Button text="Generate Payment URL" handleClick={(e) => {
            setDetails({ ...details, name: paymentFormData.name, kriyaId: paymentFormData.kriyaId });
            generatePaymentURL();
          }} />
          <Button text="Clear" outlined handleClick={(e) => {
            clearPaymentFormData();
          }} />
        </Row>
      </Layout>
    </Layout>
  );
};

export default OnSpotRegistration;
