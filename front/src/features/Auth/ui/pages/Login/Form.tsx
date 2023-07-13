import { useAppDispatch, useAppSelector } from "@/app/store"
import { login } from "@/features/Auth/store/actions"
import { selectLogin } from "@/features/Auth/store/selectors"
import { LoginReq } from "@/features/Auth/type"
import { StatusResponse } from "@/shared/enums"
import { LoaderDots } from "@/shared/ui"
import { Button, Stack, TextField, Typography } from "@mui/material"
import { Formik } from "formik"
import { NavLink, useNavigate } from "react-router-dom"
import * as yup from "yup"

const Form = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isLoading =
    useAppSelector(selectLogin).status === StatusResponse.LOADING
  const validationSchema = yup.object().shape({
    email: yup.string().required("Обязательное поле"),
    password: yup
      .string()
      .required("Обязательное поле")
      .min(5, "Минимальное количество символов 5"),
  })

  const initialValues: LoginReq = {
    email: "",
    password: "",
  }
  const onSubmit = (values: LoginReq) => {
    dispatch(login({ userData: values, navigate }))
  }

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Typography
            sx={{
              marginBottom: "10px",
              fontSize: 21,
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            Войти
          </Typography>
          <Stack spacing={2}>
            <TextField
              type="email"
              variant="outlined"
              placeholder="Почта"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{
                gridColumn: "span 4",
                borderRadius: "10px",
              }}
              size="small"
              inputProps={{
                sx: {
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px #224957 inset",
                  },
                  py: "10px",
                },
              }}
            />
            <TextField
              variant="outlined"
              placeholder="Пароль"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{
                gridColumn: "span 4",
              }}
              size="small"
              inputProps={{
                sx: {
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px #224957 inset",
                  },
                  py: "10px",
                },
              }}
            />
          </Stack>
          <Button
            fullWidth
            type="submit"
            disabled={isLoading}
            sx={{
              m: "1rem 0",
              border: "1px solid #64ffda",
              color: "#64ffda",
              py: "8px",

              "&:hover": {
                background: "rgb(100 255 218 / 10%)",
              },
            }}
          >
            {isLoading ? <LoaderDots /> : "Отправить"}
          </Button>
          <NavLink
            style={{
              color: "#64ffda",
            }}
            to="/auth/registration"
          >
            Нет аккаунта
          </NavLink>
        </form>
      )}
    </Formik>
  )
}

export default Form
