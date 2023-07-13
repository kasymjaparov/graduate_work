import React from "react"
import { Box, Button, Paper, Stack } from "@mui/material"
import { Formik } from "formik"
import useEditProfile from "./useEditProfile"
import { LoaderDots, MyInput } from "@/shared/ui"
import { Header } from "@/widgets"

const EditProfile = () => {
  const { validationSchema, initialValues, onSubmit, isLoading } =
    useEditProfile()
  return (
    <Box>
      <Header title="Редактировать профиль" subtitle=""></Header>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <>
            <Paper
              sx={{
                padding: 2,
                marginTop: "16px",
                maxWidth: "50%",
                background: "#062a42",

                "@media(max-width:968px)": {
                  maxWidth: "100%",
                },
              }}
            >
              <Stack spacing={2} direction="column">
                <MyInput
                  labelName="Имя"
                  name="first_name"
                  placeholder="Имя"
                  error={touched.first_name && !!errors.first_name}
                  errorMessage={errors.first_name}
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <MyInput
                  labelName="Фамилия"
                  name="last_name"
                  placeholder="Фамилия"
                  error={touched.last_name && !!errors.last_name}
                  errorMessage={errors.last_name}
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <MyInput
                  labelName="Номер телефона"
                  name="phone_number"
                  placeholder="Номер телефона"
                  error={touched.phone_number && !!errors.phone_number}
                  errorMessage={errors.phone_number}
                  value={values.phone_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <Button
                  type="button"
                  disabled={isLoading}
                  sx={{
                    border: "1px solid #64ffda",
                    color: "#64ffda",
                    "&:hover": {
                      background: "rgb(100 255 218 / 20%)",
                    },
                  }}
                  onClick={
                    handleSubmit as unknown as React.MouseEventHandler<HTMLButtonElement>
                  }
                >
                  {isLoading ? <LoaderDots /> : "Сохранить"}
                </Button>
              </Stack>
            </Paper>
          </>
        )}
      </Formik>
    </Box>
  )
}

export default EditProfile
