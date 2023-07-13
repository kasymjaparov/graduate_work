//@ts-nocheck
import { Box, Button, Divider, Stack, Typography } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import useCreateOrder from "./useCreateOrder"
import { Formik, FieldArray, getIn } from "formik"
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"
import { Header, ImageModal } from "@/widgets"
import {
  FileIcon,
  LoaderDots,
  MyFileInput,
  MyInput,
  MySelect,
  MyTextArea,
} from "@/shared/ui"
import { tokensDark } from "@/app/providers/ThemeProvider"
import { toBase64 } from "@/shared/libs"

const CreateOrder = () => {
  const navigate = useNavigate()
  const {
    canCreateOrder,
    validationSchema,
    initialValues,
    onSubmit,
    isLoading,
    isGetignProfileLoading,
  } = useCreateOrder()
  const [imageModal, setImageModal] = React.useState(false)
  const [imageUrl, setImageUrl] = React.useState("")
  const handleImageModalClick = (url: string) => {
    setImageModal(true)
    setImageUrl(url)
  }
  if (isGetignProfileLoading) return <></>
  return (
    <Box sx={{ pb: "100px" }}>
      <Header
        title="Подать заявку"
        subtitle={
          canCreateOrder
            ? "Укажите адрес вашей квартиры, количество комнат, серию квартиры, опишите кратко проблемы в ваших комнатах."
            : "Вы не можете подать заявку."
        }
      ></Header>
      {!canCreateOrder ? (
        <div>
          <Typography sx={{ marginTop: "16px" }}>
            Заполните свои личные данные, чтобы создать заявку
          </Typography>
          <Button
            sx={{
              marginTop: "16px",
              border: "1px solid #64ffda",
              color: "#64ffda",
              "&:hover": {
                background: "rgb(100 255 218 / 20%)",
              },
            }}
            onClick={() => navigate("/edit_account")}
          >
            Перейти
          </Button>
        </div>
      ) : (
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
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                padding: 2,
                marginTop: "16px",
                maxWidth: "70%",
                background: "#062a42",
                "@media(max-width:968px)": {
                  maxWidth: "100%",
                },
              }}
            >
              <ImageModal
                open={imageModal}
                url={imageUrl}
                onClose={() => setImageModal(false)}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />

              <Stack spacing={2}>
                <MyInput
                  labelName="Адрес"
                  name="address"
                  placeholder="Введите адрес вашей квартиры"
                  error={touched.address && !!errors.address}
                  errorMessage={errors.address}
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <MySelect
                  defaultValue={"105"}
                  showNothing={false}
                  items={[
                    { text: "1", value: "1" },
                    { text: "2", value: "2" },
                    { text: "3", value: "3" },
                    { text: "4", value: "4" },
                    { text: "5", value: "5" },
                    {
                      text: "6",
                      value: "6",
                    },
                  ]}
                  labelName="Количество комнат"
                  name="room_amount"
                  placeholder=""
                  error={touched.room_amount && !!errors.room_amount}
                  errorMessage={errors.room_amount}
                  value={values.room_amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <MySelect
                  defaultValue={"105"}
                  showNothing={false}
                  items={[
                    { text: "105", value: "105" },
                    { text: "106", value: "106" },
                    { text: "104", value: "104" },
                    { text: "104 улучшенная", value: "104 улучшенная" },
                    { text: "Сталинка", value: "Сталинка" },
                    {
                      text: "Индивидуальный проект",
                      value: "Индивидуальный проект",
                    },
                    {
                      text: "Элитка",
                      value: "Элитка",
                    },
                  ]}
                  labelName="Серия"
                  name="series"
                  placeholder=""
                  error={touched.series && !!errors.series}
                  errorMessage={errors.series}
                  value={values.series}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <MyInput
                  name="square"
                  value={values.square}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Площадь всей квартиры"
                  type="number"
                  placeholder="Площадь всей квартиры"
                  error={Boolean(touched.square && errors.square)}
                  errorMessage={errors.square}
                />
                <Typography
                  sx={{
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: "20px",
                    "@media(max-width:640px)": {
                      fontSize: "17px",
                    },
                  }}
                >
                  Комнаты и их проблемы
                </Typography>
                <FieldArray name="order_room">
                  {({ push, remove }) => {
                    return (
                      <div className="rooms_subform">
                        {values.order_room.map((i, index: number) => {
                          const roomName = `order_room[${index}].name`
                          const touchedroomName = getIn(touched, roomName)
                          const errorroomName = getIn(errors, roomName)
                          //
                          const descriptionName = `order_room[${index}].description`
                          const touchedDescription = getIn(
                            touched,
                            descriptionName
                          )
                          const errordescription = getIn(
                            errors,
                            descriptionName
                          )
                          //
                          const squareName = `order_room[${index}].square`
                          const touchedSquare = getIn(touched, squareName)
                          const errorSquare = getIn(errors, squareName)
                          //
                          const imageName = `order_room[${index}].order_image`
                          const touchedImage = getIn(touched, imageName)
                          const errorImage = getIn(errors, imageName)
                          return (
                            <div style={{ marginBottom: "20px" }} key={index}>
                              <Typography
                                sx={{
                                  textAlign: "center",
                                  fontWeight: 700,
                                  fontSize: "18px",
                                  textDecoration: "underline",
                                  "@media(max-width:640px)": {
                                    fontSize: "16px",
                                  },
                                }}
                              >
                                Комнаты №{index + 1}
                              </Typography>
                              <Stack spacing={2} direction="column">
                                <MyInput
                                  name={roomName}
                                  value={i.name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  labelName={`Название комнаты №${index + 1}`}
                                  placeholder="Название комнаты"
                                  error={Boolean(
                                    touchedroomName && errorroomName
                                  )}
                                  errorMessage={errorroomName}
                                />
                                <MyTextArea
                                  name={descriptionName}
                                  value={i.description}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  labelName={`Опишите проблему комнаты №${
                                    index + 1
                                  }`}
                                  placeholder="Опишите проблему комнаты"
                                  error={Boolean(
                                    touchedDescription && errordescription
                                  )}
                                  errorMessage={errordescription}
                                />
                                <MyInput
                                  name={squareName}
                                  value={i.square}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  labelName={`Площадь комнаты №${index + 1}`}
                                  type="number"
                                  placeholder="Площадь комнаты"
                                  error={Boolean(touchedSquare && errorSquare)}
                                  errorMessage={errorSquare}
                                />
                                <MyFileInput
                                  name={imageName}
                                  multiple={true}
                                  accept="image/jpeg"
                                  labelName={`Выберите фотографии комнаты №${
                                    index + 1
                                  }`}
                                  onBlur={handleBlur}
                                  onChange={async (
                                    e: React.ChangeEvent<HTMLInputElement>
                                  ) => {
                                    if (!e.currentTarget.files) return
                                    let arr: unknown[] = []
                                    await Array.from(
                                      e.currentTarget.files
                                    ).forEach(async (item) => {
                                      const imageInBase64 = await toBase64(item)
                                      arr.push({
                                        image: imageInBase64,
                                      })
                                      setFieldValue(imageName, arr)
                                    })
                                  }}
                                  setFieldTouched={setFieldTouched}
                                  error={touchedImage && !!errorImage}
                                  errorMessage={errorImage as string}
                                />
                                {values.order_room[index].order_image.length >=
                                1 ? (
                                  <>
                                    <span className="myform__label">
                                      Фотографии комнаты №{index + 1}
                                    </span>
                                    <div style={{ marginTop: "0px" }}>
                                      {Array.from(
                                        values.order_room[index].order_image
                                      ).map((doc: any, index) => {
                                        return (
                                          <FileIcon
                                            url={doc.image}
                                            handleClick={handleImageModalClick}
                                            key={index}
                                            icon={<InsertDriveFileIcon />}
                                          />
                                        )
                                      })}
                                    </div>
                                  </>
                                ) : null}
                              </Stack>
                              {index > 0 ? (
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
                                  Удалить эту комнату
                                </Button>
                              ) : null}
                              {index + 1 !== values.order_room.length ? (
                                <Divider sx={{ mt: "20px" }} />
                              ) : null}
                            </div>
                          )
                        })}
                        <Button
                          size="small"
                          onClick={() =>
                            push({
                              name: "",
                              description: "",
                              square: "",
                              order_image: [],
                            })
                          }
                          sx={{
                            border: "1px solid #63fdff",
                            color: "#63fdff",
                            "&:hover": {
                              background: "rgb(100 255 218 / 20%)",
                            },
                          }}
                        >
                          Добавить комнату
                        </Button>
                      </div>
                    )
                  }}
                </FieldArray>

                <Button
                  type="submit"
                  sx={{
                    border: "1px solid #64ffda",
                    color: "#64ffda",
                    "&:hover": {
                      background: "rgb(100 255 218 / 20%)",
                    },
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? <LoaderDots /> : "Отправить"}
                </Button>
              </Stack>
            </Box>
          )}
        </Formik>
      )}
    </Box>
  )
}

export default CreateOrder
