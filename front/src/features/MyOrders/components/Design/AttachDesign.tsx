import { Header } from "@/widgets"
import { Box, Button, Stack, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@/app/store"
import * as yup from "yup"
import { Design } from "../../type"
import { FieldArray, Formik, getIn } from "formik"
import { LoaderDots, MyFileInput, MyTextArea } from "@/shared/ui"
import { toBase64 } from "@/shared/libs"
import { setDesign } from "../../store/actions"
import { selectSetDesignStatus } from "../../store/selectors"
import { StatusResponse } from "@/shared/enums"

const AttachDesign = ({
  designId,
  closeModal,
  orderId,
}: {
  designId?: number
  closeModal: () => void
  orderId: number
}) => {
  const dispatch = useAppDispatch()
  const isLoading =
    useAppSelector(selectSetDesignStatus) === StatusResponse.LOADING
  const validationSchema = yup.object().shape({
    file: yup.mixed().required("Обязательное поле"),
    description: yup.string().required("Обязательное поле"),
    sample_image: yup.array().of(
      yup.object().shape({
        image: yup.mixed().required("Обязательное поле"),
      })
    ),
  })
  const initialValues: Design = {
    description: "",
    sample_image: [{ image: "", description: "" }],
    file: "",
  }
  const onSubmit = (data: Design) => {
    dispatch(setDesign({ req: data, designId: designId!, orderId })).then(
      () => {
        closeModal()
      }
    )
  }
  return (
    <Box>
      <Header
        title="Прикрепить дизайн"
        subtitle="Прикрепите визуализацию, скрины с дизайном и описанием к ним."
      />
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
          setFieldValue,
          setFieldTouched,
        }) => (
          <Stack
            spacing={2}
            component="form"
            maxWidth={"600px"}
            onSubmit={handleSubmit}
          >
            <Box>
              <MyFileInput
                name="file"
                multiple={false}
                accept=".pdf,video/mp4,video/x-m4v,video/*"
                labelName="Прикрепите визуализацию"
                onBlur={handleBlur}
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                  if (!e.currentTarget.files) return
                  const fileInBase64 = await toBase64(
                    e.currentTarget.files[0] as File
                  )
                  setFieldValue("file", fileInBase64)
                }}
                setFieldTouched={setFieldTouched}
                error={touched.file && !!errors.file}
                errorMessage={errors.file as string}
              />
              {values.file ? (
                <Typography sx={{ my: "8px" }}>
                  Визуализацию прикреплена
                </Typography>
              ) : null}
            </Box>

            <MyTextArea
              labelName="Описание к визуализации"
              name="description"
              placeholder="Описание"
              error={touched.description && !!errors.description}
              errorMessage={errors.description}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FieldArray name="sample_image">
              {({ push, remove }) => {
                return (
                  <div>
                    {values.sample_image.map((i: any, index: number) => {
                      const image = `sample_image[${index}].image`
                      const touchedimage = getIn(touched, image)
                      const errorimage = getIn(errors, image)
                      //
                      const descriptionName = `sample_image[${index}].description`
                      const touchedDescription = getIn(touched, descriptionName)
                      const errordescription = getIn(errors, descriptionName)

                      return (
                        <div style={{ marginBottom: "20px" }} key={index}>
                          <Typography
                            sx={{
                              mb: "15px",
                              fontWeight: 700,
                              textAlign: "center",
                            }}
                          >
                            Фотография № {index + 1}
                          </Typography>
                          <Stack spacing={2} direction="column">
                            <MyFileInput
                              name={image}
                              multiple={false}
                              accept="image/jpeg,image/png"
                              labelName="Выберите фотографию дизайна"
                              onBlur={handleBlur}
                              onChange={async (
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                if (!e.currentTarget.files) return
                                const imageInBase64 = await toBase64(
                                  e.currentTarget.files[0] as File
                                )
                                setFieldValue(image, imageInBase64)
                              }}
                              setFieldTouched={setFieldTouched}
                              error={touchedimage && !!errorimage}
                              errorMessage={errorimage as string}
                            />
                            {values.sample_image[index]?.image ? (
                              <img
                                src={values.sample_image[index]?.image}
                                alt="image"
                                style={{
                                  width: "250px",
                                  objectFit: "contain",
                                }}
                              />
                            ) : null}
                            <MyTextArea
                              name={descriptionName}
                              value={i.description}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              labelName="Описание к фотографии"
                              placeholder="Описание"
                              error={Boolean(
                                touchedDescription && errordescription
                              )}
                              errorMessage={errordescription}
                            />
                          </Stack>
                          {index > 0 && (
                            <Button
                              size="small"
                              onClick={() => remove(index)}
                              sx={{
                                mt: "10px",
                                border: "1px solid #DA1026 ",
                                color: "#DA1026 ",
                                "&:hover": {
                                  background: "rgb(255 100 123 / 10%)",
                                },
                              }}
                            >
                              Удалить
                            </Button>
                          )}
                        </div>
                      )
                    })}
                    <Button
                      size="small"
                      onClick={() =>
                        push({
                          image: "",
                          description: "",
                        })
                      }
                      sx={{
                        border: "1px solid #64ffda",
                        color: "#64ffda",
                        "&:hover": {
                          background: "rgb(100 255 218 / 20%)",
                        },
                      }}
                    >
                      Добавить
                    </Button>
                  </div>
                )
              }}
            </FieldArray>
            <Button
              type="submit"
              disabled={isLoading}
              sx={{
                border: "1px solid #64ffda",
                color: "#64ffda",
                "&:hover": {
                  background: "rgb(100 255 218 / 20%)",
                },
                my: "20px",
              }}
            >
              {isLoading ? <LoaderDots /> : "Отправить"}
            </Button>
          </Stack>
        )}
      </Formik>
    </Box>
  )
}

export default AttachDesign
