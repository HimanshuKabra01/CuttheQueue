import { Patient } from "../Models/patient.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { PatientToken } from "../Models/patientToken.models.js";
import { Doctor } from "../Models/doctor.models.js";
// import generateToken from "../utils/generateToken.js";
const options = {
  httpOnly: true,
  secure: true,
};
const generatePatientToken = async (patientId) => {
  try {
    console.log("➡️ Starting generatePatientToken for patientId:", patientId);

    const today = new Date();
    today.setHours(1, 0, 0, 0);
    const todayStr = today.toISOString().split("T")[0];

    console.log("📅 Today's date string:", todayStr);

    // Corrected query (matching string format)
    let tokenData = await PatientToken.findOne({ date: todayStr });
    console.log("🔍 Existing tokenData:", tokenData);

    const patient = await Patient.findById(patientId);
    console.log("🧑‍⚕️ Fetched patient:", patient);

    if (!patient) {
      console.error("❌ ERROR: Patient not found!");
      throw new ApiError(404, "Patient not found");
    }

    let assignedDoctor = null;

    if (patient.isNewPatient) {
      assignedDoctor = await Doctor.findOne({
        department: patient.department,
      }).sort({ patients: 1 });
      console.log("👨‍⚕️ Assigned Doctor (New Patient):", assignedDoctor);
    } else {
      assignedDoctor = patient.doctor;
      console.log("👨‍⚕️ Assigned Doctor (Existing Patient):", assignedDoctor);
    }

    if (!tokenData) {
      console.log("⚠️ No existing tokenData found. Creating a new one...");

      // Generate a random token
      const generatedToken = `TOKEN-${Date.now()}-${Math.floor(
        Math.random() * 1000
      )}`;

      tokenData = await PatientToken.create({
        token: generatedToken, // Added required token field
        date: todayStr,
        lastTokenNo: 1,
        department: patient.department,
        doctor: assignedDoctor ? assignedDoctor._id : null,
        patient: patient._id,
      });

      console.log("✅ Created new PatientToken:", tokenData);
    } else {
      console.log("🔄 Incrementing lastTokenNo...");
      tokenData.lastTokenNo += 1;
      await tokenData.save();
    }

    console.log("📌 Updating patient's token reference...");
    patient.patientToken = tokenData._id;
    await patient.save({ validateBeforeSave: false });

    console.log(
      "✅ generatePatientToken SUCCESSFUL! Returning tokenData:",
      tokenData
    );
    return tokenData;
  } catch (error) {
    console.error("❌ ERROR in generatePatientToken:", error);
    throw new ApiError(500, "Error generating token in generatePatientToken");
  }
};

const generateAcessTokenAndRefreshToken = async (patientId) => {
  try {
    const patient = await Patient.findById(patientId);
    const accessToken = patient.generateAcessToken();
    const refreshToken = patient.generateRefreshToken();
    patient.refreshToken = refreshToken;
    await patient.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Error generating tokens in generateAcessTokenAndRefreshToken"
    );
  }
};
const register = asyncHandler(async (req, res) => {
  const { name, age, email, password, phoneNumber, isNewPatient, department } =
    req.body;

  const patientExists = await Patient.findOne({ name });

  if (patientExists) {
    throw new ApiError(400, "User already exists");
  }
  const medicalHistoryPath = req.file?.path;

  if (!medicalHistoryPath) {
    throw new ApiError(400, "Medical history is required");
  }

  const medicalHistory = await uploadOnCloudinary(medicalHistoryPath);
  if (!medicalHistory) {
    throw new ApiError(500, "Error uploading medical history");
  }
  const patient = await Patient.create({
    name,
    email,
    password,
    age,
    phoneNumber,
    isNewPatient,
    department,
    medicalHistory: medicalHistory.url,
  });

  console.log("patient is created", patient);

  const createdPatient = await Patient.findById(patient._id).select(
    "-password -refreshToken"
  );

  return res
    .status(201)
    .json(new ApiResponse(201, createdPatient, "Patient created successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const patient = await Patient.findOne({ email });
  console.log("patient", patient);
  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  const isPasswordCorrect = await patient.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  //   const accessToken = patient.generateAcessToken();
  //   const refreshToken = patient.generateRefreshToken();

  //   patient.refreshToken = refreshToken;
  //   await patient.save({ validateBeforeSave: false });

  const { accessToken, refreshToken } = await generateAcessTokenAndRefreshToken(
    patient._id
  );

  if (!accessToken || !refreshToken) {
    throw new ApiError(500, "Error generating tokens in patient login");
  }

  const tokenData = await generatePatientToken(patient._id);
  console.log("tokenData", tokenData);
  if (!tokenData) {
    throw new ApiError(500, "Error generating token in patient login");
  }
  console.log("patient logged in", patient._id);
  const loggedInPatient = await Patient.findById(patient._id).select(
    "-password -refreshToken"
  );
  console.log("we are here", tokenData);
  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { patient: loggedInPatient, accessToken, tokenData, refreshToken },
        "Patientlogged in successfully"
      )
    );
});

const getTokenNo = asyncHandler(async (req, res) => {
  try {
    const patient = await Patient.findById(req.patient._id);
    if (!patient) {
      throw new ApiError(404, "Patient not found");
    }

    const tokenData = patient?.patientToken;
    if (!tokenData) {
      throw new ApiError(404, "Token not found");
    }
    const token = await PatientToken.findById(tokenData);
    if (!token) {
      throw new ApiError(404, "Token not  found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, token, "Token number fetched successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Error fetching token number");
  }
});
const logout = asyncHandler(async (req, res) => {
  await Patient.findByIdAndUpdate(
    req.patient._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .clearCookie("refreshToken")
    .clearCookie("accessToken")
    .json(new ApiResponse(200, {}, "Patient logged out successfully"));
});

export { register, login, logout, generatePatientToken, getTokenNo };
