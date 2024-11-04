import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { PaddlerInfo } from "../types/PaddlerInfo";
import { SidePreference } from "../types/SidePreference";
import { Gender } from "../types/Gender";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FileInput from "../components/FileInput";
import InfoIcon from "@mui/icons-material/Info";

const AddPaddler = () => {
  const [paddlerInfo, setPaddlerInfo] = useState<PaddlerInfo>({
    fullName: "",
    gender: Gender.UNDEFINED,
    weight: 0,
    sidePreference: SidePreference.UNDEFINED,
    canSteer: false,
    canDrum: false,
  });
  const [paddlerInfoErrors, setPaddlerInfoErrors] = useState({
    fullName: "",
    gender: "",
    weight: "",
    sidePreference: "",
    canSteer: "",
    canDrum: "",
  });
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");
  const navigate = useNavigate();

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "weight") {
      setPaddlerInfo({
        ...paddlerInfo,
        [name]: Number(value),
      });
    } else if (name === "canSteer" || name === "canDrum") {
      const checked = e.target.checked;
      setPaddlerInfo({
        ...paddlerInfo,
        [name]: checked,
      });
    } else {
      setPaddlerInfo({
        ...paddlerInfo,
        [name]: value,
      });
    }
  };

  const onFormBlur = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    if (value !== "") {
      setPaddlerInfoErrors({
        ...paddlerInfoErrors,
        [name]: "",
      });
    }
  };

  const onSelectChange = (e: SelectChangeEvent) => {
    const name = e.target.name;
    const value = e.target.value;

    setPaddlerInfo({
      ...paddlerInfo,
      [name]: value,
    });

    if (name === "gender" || name === "sidePreference") {
      setPaddlerInfoErrors({
        ...paddlerInfoErrors,
        [name]: "",
      });
    }
  };

  const handleAddPaddler = () => {
    const hasErrors = validatePaddler(paddlerInfo);
    if (hasErrors) {
      return;
    }

    addPaddler();
  };

  const addPaddler = () => {
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}/paddlers`, paddlerInfo)
      .then(() => {
        setLoading(false);
        navigate("/paddlers?add=success&multiple=false", { replace: true });
      });
  };

  const validatePaddler = (paddlerInfo: PaddlerInfo) => {
    let hasErrors = false;
    let errs = paddlerInfoErrors;
    for (const [field, value] of Object.entries(paddlerInfo)) {
      const errMsg = validateField(field, value);
      errs = {
        ...errs,
        [field]: errMsg,
      };
      setPaddlerInfoErrors(errs);
      if (errMsg) {
        hasErrors = true;
      }
    }

    return hasErrors;
  };

  const validateField = (
    fieldName: string,
    fieldValue: string | number | boolean
  ) => {
    if (typeof fieldValue == "string" && fieldValue === "") {
      return `${fieldToLabel(fieldName)} cannot be empty`;
    } else if (typeof fieldValue === "number" && fieldValue === 0) {
      return `${fieldToLabel(fieldName)} cannot be 0`;
    }
    return "";
  };

  const fieldToLabel = (field: string) => {
    switch (field) {
      case "fullName":
        return "Full Name";
      case "gender":
        return "Gender";
      case "weight":
        return "Weight";
      case "sidePreference":
        return "Side Preferencce ";
      default:
        return field;
    }
  };

  const onFileError = (message: string) => {
    setFileError(message);
  };

  const handleSnackbarClose = () => {
    setFileError("");
  };

  return (
    <div>
      <main>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: { xs: 2, sm: 2, md: 4 },
            gap: 2,
            maxWidth: { md: "70%", lg: "50%", xl: "30%" },
            mt: { md: 5 },
            mx: { md: "auto" },
            borderRadius: { md: "12px" },
            boxShadow: { md: "0 0 8px rgba(0,0,0,0.5)" },
          }}
        >
          <h1 className="text-2xl">Add a Paddler</h1>
          <FileInput onFileError={onFileError} />
          <Container
            sx={{ display: "flex", alignItems: "center", gap: 1, px: 0 }}
          >
            <InfoIcon />
            <Typography variant="subtitle2">
              File must be csv or excel
            </Typography>
          </Container>
          <Divider>OR</Divider>
          <TextField
            required
            label="Full Name"
            name="fullName"
            value={paddlerInfo.fullName}
            onChange={onFormChange}
            error={paddlerInfoErrors.fullName !== ""}
            helperText={paddlerInfoErrors.fullName}
            onBlur={onFormBlur}
          />
          <FormControl error={paddlerInfoErrors.gender !== ""}>
            <InputLabel id="genderLabel">Gender</InputLabel>
            <Select
              required
              labelId="genderLabel"
              name="gender"
              label="Gender"
              value={paddlerInfo.gender}
              onChange={onSelectChange}
              onBlur={onFormBlur}
            >
              <MenuItem value={Gender.MALE}>Male</MenuItem>
              <MenuItem value={Gender.FEMALE}>Female</MenuItem>
              <MenuItem value={Gender.NON_BINARY}>Non-Binary</MenuItem>
            </Select>
            <FormHelperText>{paddlerInfoErrors.gender}</FormHelperText>
          </FormControl>
          <TextField
            type="number"
            label="Weight"
            name="weight"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">lbs</InputAdornment>
                ),
              },
            }}
            value={paddlerInfo.weight === 0 ? "" : paddlerInfo.weight}
            onChange={onFormChange}
            error={paddlerInfoErrors.weight !== ""}
            helperText={paddlerInfoErrors.weight}
          />
          <FormControl error={paddlerInfoErrors.sidePreference !== ""}>
            <InputLabel id="sidePreferenceLabel">Side Preference</InputLabel>
            <Select
              required
              name="sidePreference"
              labelId="sidePreferenceLabel"
              label="Side Preference"
              value={paddlerInfo.sidePreference}
              onChange={onSelectChange}
            >
              <MenuItem value={SidePreference.LEFT}>Left</MenuItem>
              <MenuItem value={SidePreference.RIGHT}>Right</MenuItem>
              <MenuItem value={SidePreference.ANY}>Any</MenuItem>
            </Select>
            <FormHelperText>{paddlerInfoErrors.sidePreference}</FormHelperText>
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                checked={paddlerInfo.canSteer}
                onChange={onFormChange}
              />
            }
            name="canSteer"
            label="Can Steer"
          />
          <FormControlLabel
            control={
              <Checkbox checked={paddlerInfo.canDrum} onChange={onFormChange} />
            }
            name="canDrum"
            label="Can Drum"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ px: 2, py: 1 }}
            onClick={handleAddPaddler}
            disabled={loading}
          >
            {loading ? <CircularProgress /> : "Add Paddler"}
          </Button>
        </Box>
        {fileError ? (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={fileError !== ""}
            onClose={handleSnackbarClose}
          >
            <Alert
              severity="error"
              variant="filled"
              color="error"
              onClose={handleSnackbarClose}
            >
              {fileError}
            </Alert>
          </Snackbar>
        ) : null}
      </main>
    </div>
  );
};

export default AddPaddler;
