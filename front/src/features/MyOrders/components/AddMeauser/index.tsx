import { Button, Grid, Stack, Typography } from "@mui/material"
import * as yup from "yup"
import { Formik } from "formik"
import { useAppDispatch, useAppSelector } from "@/app/store"
import { AddMeauser } from "../../type"
import { addMeasurement } from "../../store/actions"
import { LoaderDots, MyFileInput, MyInput } from "@/shared/ui"
import { selectAddMeauserStatus } from "../../store/selectors"
import { StatusResponse } from "@/shared/enums"

interface Props {
  id: string
  orderId: number
  allow: boolean
}
const AddMeauserPage = ({ id, orderId, allow }: Props) => {
  if (!allow) return <></>
  const dispatch = useAppDispatch()
  const isLoading =
    useAppSelector(selectAddMeauserStatus) === StatusResponse.LOADING
  const validationSchema = yup.object().shape({
    comment: yup.string().required("Обязательное поле"),
    file: yup.mixed().required("Обязательное поле"),
  })
  const initialValues: AddMeauser = {
    comment: "",
    file: "",
  }
  const onSubmit = (createData: AddMeauser) => {
    const fd = new FormData()
    fd.append("comment", createData.comment)
    fd.append("file", createData.file)
    dispatch(addMeasurement({ id, fd, orderId }))
  }
  return (
    <Grid item md={6} xs={12}>
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
          setFieldValue,
          setFieldTouched,
        }) => (
          <Stack spacing={2}>
            <MyFileInput
              name="file"
              multiple={false}
              accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf"
              labelName="Выберите файл замера"
              onBlur={handleBlur}
              onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.currentTarget.files) return
                setFieldValue("file", e.currentTarget.files[0])
                console.log(e.currentTarget.files[0])
              }}
              setFieldTouched={setFieldTouched}
              error={touched.file && !!errors.file}
              errorMessage={errors.file as string}
            />
            {values.file ? <Typography>Файл выбран</Typography> : null}

            <MyInput
              name="comment"
              value={values.comment}
              onChange={handleChange}
              onBlur={handleBlur}
              labelName=""
              placeholder="Комментарий"
              error={Boolean(touched.comment && errors.comment)}
              errorMessage={errors.comment}
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
              disabled={isLoading}
            >
              {isLoading ? <LoaderDots /> : "Отправить"}
            </Button>
          </Stack>
        )}
      </Formik>
    </Grid>
  )
}

export default AddMeauserPage
