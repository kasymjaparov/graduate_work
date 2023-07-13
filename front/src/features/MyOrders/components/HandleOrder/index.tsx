import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useAppDispatch, useAppSelector } from "@/app/store"
import { LoaderDots, MySelect } from "@/shared/ui"
import {
  Stack,
  FormControl,
  Typography,
  MenuItem,
  Button,
  Box,
  SelectChangeEvent,
  Select,
} from "@mui/material"
import { getById, appoint, getUsers } from "../../store/actions"
import { AcceptOrder } from "../../type"
import { selectAppointStatus, selectUsers } from "../../store/selectors"
import { StatusResponse } from "@/shared/enums"

const HandleOrder = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const { id } = useParams()
  const { builders, designers, meausers } = useAppSelector(selectUsers)

  const [workers, setWorkers] = useState<AcceptOrder>({
    repair_type: "Капитальный",
    order_id: 0,
    meauser_id: 0,
    designer_id: 0,
    builder_id: [],
  })
  const handleChange = (
    e: SelectChangeEvent<string | number | number[] | string[]>
  ) => {
    setWorkers({ ...workers, [e.target.name]: e.target.value })
  }
  const dispatch = useAppDispatch()
  const isLoadingAppoint =
    useAppSelector(selectAppointStatus) === StatusResponse.LOADING

  const [type, setType] = useState<"Капитальный" | "Косметический">(
    "Капитальный"
  )

  const handleType = (event: SelectChangeEvent<any>) => {
    setType(event.target.value as "Капитальный" | "Косметический")
  }
  const onAppointEmployeers = () => {
    dispatch(
      appoint({
        meauser_id: workers.meauser_id,
        repair_type: type,
        builder_id: workers.builder_id,
        order_id: Number(id),
        designer_id: workers.designer_id,
      })
    ).then(() => {
      onCloseModal()
      dispatch(getById(id as string))
      window.scrollTo(0, 0)
    })
  }
  useEffect(() => {
    dispatch(getUsers())
  }, [])
  return (
    <Stack
      sx={{ marginTop: "10px", maxWidth: "600px" }}
      direction="row"
      spacing={2}
    >
      <FormControl sx={{ width: "100%" }}>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            marginBottom: "10px",
          }}
        >
          Выберите ответственных за проект
        </Typography>
        <Stack spacing={2}>
          <Box>
            <Typography>Дизайнер</Typography>
            <Select
              value={workers.designer_id}
              onChange={e => handleChange(e)}
              displayEmpty
              name="designer_id"
              fullWidth
              size="small"
            >
              {designers.data.map((selectObj, index) => (
                <MenuItem key={index} value={selectObj.id}>
                  {selectObj.email}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <Typography>Замерщик</Typography>
            <Select
              value={workers.meauser_id}
              onChange={e => handleChange(e)}
              displayEmpty
              name="meauser_id"
              fullWidth
              size="small"
            >
              {meausers.data.map((selectObj, index) => (
                <MenuItem key={index} value={selectObj.id}>
                  {selectObj.email}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <Typography>Строители</Typography>
            <Select
              value={workers.builder_id}
              onChange={e => handleChange(e)}
              multiple
              displayEmpty
              fullWidth
              name="builder_id"
              size="small"
            >
              {builders.data.map((selectObj, index) => (
                <MenuItem key={index} value={selectObj.id}>
                  {selectObj.email}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <MySelect
            showNothing={false}
            labelName="Тип ремонта"
            value={type}
            defaultValue={"Капитальный"}
            onBlur={() => {}}
            onChange={handleType}
            name="order_type"
            items={[
              { text: "Капитальный", value: "Капитальный" },
              { text: "Косметический", value: "Косметический" },
            ]}
          />
        </Stack>

        <Button
          onClick={onAppointEmployeers}
          disabled={isLoadingAppoint}
          sx={{
            marginTop: "10px",
            border: "1px solid #64ffda",
            color: "#64ffda",
            "&:hover": {
              background: "rgb(100 255 218 / 20%)",
            },
          }}
        >
          {isLoadingAppoint ? <LoaderDots /> : "Отправить"}
        </Button>
      </FormControl>
    </Stack>
  )
}

export default HandleOrder
