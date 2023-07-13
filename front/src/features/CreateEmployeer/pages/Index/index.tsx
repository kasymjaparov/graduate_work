import React from "react"
import { Button, Paper, Stack } from "@mui/material"
import { Formik } from "formik"
import useCreateEmployeer from "./useCreateEmployeer"
import { Roles } from "@/shared/enums"
import { MyInput, MySelect } from "@/shared/ui"
import { tokensDark } from "@/app/providers/ThemeProvider"
import { Header } from "@/widgets"

const EditProfile = () => {
  const { validationSchema, initialValues, onSubmit } = useCreateEmployeer()
  return (
    <div>
      <Header
        title="Добавить сотрудника"
        subtitle="Укажите почту, пароль и должность сотрудника"
      ></Header>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        onSubmit={onSubmit}
        validationSchema={validationSchema}
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
                background: tokensDark.primary[500],
                "@media(max-width:968px)": {
                  maxWidth: "100%",
                },
              }}
            >
              <Stack spacing={2} direction="column">
                <MyInput
                  labelName="Почта"
                  name="email"
                  placeholder="Почта"
                  error={touched.email && !!errors.email}
                  errorMessage={errors.email}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <MyInput
                  labelName="Пароль"
                  name="password"
                  placeholder="Пароль"
                  error={touched.password && !!errors.password}
                  errorMessage={errors.password}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <MySelect
                  showNothing={false}
                  items={[
                    { text: "Строитель", value: Roles.BUILDER },
                    { text: "Дизайнер", value: Roles.DESIGNER },
                    { text: "Замерщик", value: Roles.MEASURE },
                  ]}
                  onBlur={handleBlur}
                  name="type"
                  onChange={handleChange}
                  labelName="Должность"
                  error={touched.type && !!errors.type}
                  errorMessage={errors.type}
                  defaultValue={"0"}
                />
                <Button
                  type="button"
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
                  Добавить
                </Button>
              </Stack>
            </Paper>
          </>
        )}
      </Formik>
    </div>
  )
}

export default EditProfile
