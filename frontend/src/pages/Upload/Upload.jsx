import { useNavigate } from "react-router-dom";
import Navbar from "../../Components-Common/Header";
import Footer from "../../Components-Common/Footer";
import { useState } from "react";

const Upload = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: "",
    date: "",
    diseaseName: "",
    doctorName: "",
    hospitalName: "",
    hospitalAddress: "",
    age: "",
  });
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/auth/upload`, {
        method: "POST",
        body: uploadData,
      });
      if (!response.ok) {
        console.error("Error uploading file:", response.statusText);
        alert("Error uploading file. Please try again.");
        return;
      }

      const data = await response.json();
      console.log(data);
      setFormData({
        patientName: data.patientName || "Unknown",
        date: data.date || "N/A",
        diseaseName: data.condition || "N/A",
        doctorName: data.doctorName || "N/A",
        hospitalName: data.hospitalName || "N/A",
        hospitalAddress: data.hospitalAddress || "N/A",
        age: data.age || "N/A",
      });
      setDrugs(data.medications || []);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error processing file:", error);
      alert("An error occurred while processing the file.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    const prescription = {
      patientName: formData.patientName,
      startDate: formData.date,
      diseaseName: formData.diseaseName,
      doctorName: formData.doctorName,
      hospitalName: formData.hospitalName,
      hospitalAddress: formData.hospitalAddress,
      endDate: null,
      membershipId: localStorage.getItem("membershipId"),
      medications: drugs, // ✅ Ensure medications are sent
    };
  
    fetch("http://localhost:8080/api/auth/addPrescription", {
      method: "POST",
      body: JSON.stringify(prescription),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        console.error("Failed to save prescription:", res.statusText);
        return;
      }
      console.log("Prescription saved successfully");
      navigate("/prescription");
    });
  };
  

  return (
    <div className="bg-green-50 min-h-screen flex flex-col max-w-[1920px] mx-auto mt-16">
      <Navbar />
      <div className="flex-grow flex justify-center items-center m-5">
        <div className="w-full max-w-lg bg-blue-100 p-6 rounded-md shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Prescription Form</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="file" className="block text-gray-700 font-medium mb-2">Upload Prescription File:</label>
              <input type="file" id="file" name="file" onChange={handleFileUpload} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            {loading ? (
              <p className="text-center text-blue-500">Processing file, please wait...</p>
            ) : (
              <>
                {/* Patient Name Field at the Top */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Patient Name:</label>
                  <input type="text" value={formData.patientName} readOnly className="w-full p-2 border rounded bg-gray-100 focus:outline-none" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Date:</label>
                  <input type="text" value={formData.date} readOnly className="w-full p-2 border rounded bg-gray-100 focus:outline-none" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Disease Name:</label>
                  <input type="text" value={formData.diseaseName} readOnly className="w-full p-2 border rounded bg-gray-100 focus:outline-none" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Doctor Name:</label>
                  <input type="text" value={formData.doctorName} readOnly className="w-full p-2 border rounded bg-gray-100 focus:outline-none" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Hospital Name:</label>
                  <input type="text" value={formData.hospitalName} readOnly className="w-full p-2 border rounded bg-gray-100 focus:outline-none" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Hospital Address:</label>
                  <input type="text" value={formData.hospitalAddress} readOnly className="w-full p-2 border rounded bg-gray-100 focus:outline-none" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Age:</label>
                  <input type="text" value={formData.age} readOnly className="w-full p-2 border rounded bg-gray-100 focus:outline-none" />
                </div>
                <div className="mb-4">
                  <h3 className="text-gray-700 font-medium mb-2">Prescribed Medications</h3>
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Sl. No</th>
                        <th className="border border-gray-300 px-4 py-2">Drug Name</th>
                        <th className="border border-gray-300 px-4 py-2">Days</th>
                      </tr>
                    </thead>
                    <tbody>
                      {drugs.map((drug, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                          <td className="border border-gray-300 px-4 py-2">{drug.name}</td>
                          <td className="border border-gray-300 px-4 py-2">{drug.days}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            <div className="flex justify-between mt-6">
              <button type="button" className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none" onClick={() => navigate("/home")}>
                Close
              </button>
              <button type="button" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none" onClick={handleSave}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Upload;
