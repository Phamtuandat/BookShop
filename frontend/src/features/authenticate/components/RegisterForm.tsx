import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { Box, Button } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { InputField, PasswordField } from "components/inputField"
import { registerRequest } from "models"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
type Props = {
    onSubmit: (formValue: registerRequest) => void
    handleLogout: () => void
    toggleMode: () => void
}

export const RegisterForm = ({ onSubmit, toggleMode }: Props) => {
    const initialValue: registerRequest = {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phoneNumber: null,
    }
    const schema = Yup.object({
        email: Yup.string().required("Email is required").email("Email is invalid"),
        firstName: Yup.string().min(3).required(),
        lastName: Yup.string().required(),
        phone: Yup.number().min(9).required(),
        password: Yup.string()
            .min(
                8,
                "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
            )
            .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
        confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
    })
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<registerRequest>({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    })
    const handleFormSubmit = (formValue: registerRequest) => {
        if (formValue !== null) {
            onSubmit(formValue)
        }
    }
    return (
        <Box
            sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>
            <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                <InputField control={control} name="email" label="Email" disabled={isSubmitting} />
                <InputField
                    control={control}
                    name="firstName"
                    label="First Name"
                    disabled={isSubmitting}
                />
                <InputField
                    control={control}
                    name="lastName"
                    label="Last Name"
                    disabled={isSubmitting}
                />
                <InputField
                    control={control}
                    name="phone"
                    label="Phone Number"
                    disabled={isSubmitting}
                />

                <PasswordField
                    control={control}
                    name="password"
                    label="Password"
                    disabled={isSubmitting}
                    id="Password"
                />
                <PasswordField
                    control={control}
                    name="confirmPassword"
                    label="Confirm Password"
                    disabled={isSubmitting}
                    id="confirm"
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Sign Up
                </Button>
                <Grid container>
                    <Grid item>
                        <Button variant="text" onClick={() => toggleMode()}>
                            {"Have an account? Sign In"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
