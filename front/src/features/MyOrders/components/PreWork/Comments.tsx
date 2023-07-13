import { tokensDark } from "@/app/providers/ThemeProvider"
import {
  Box,
  Paper,
  IconButton,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Stack,
  Skeleton,
  Typography,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import SendIcon from "@mui/icons-material/Send"
import MessageItem from "./MessageItem"
import { useAppDispatch, useAppSelector } from "@/app/store"
import { useEffect, useState } from "react"
import { addComment, getComments } from "../../store/actions"
import {
  selectAddCommentStatus,
  selectCommentsList,
  selectCommentsStatus,
} from "../../store/selectors"
import { StatusResponse } from "@/shared/enums"
import PendingIcon from "@mui/icons-material/Pending"

const Comments = ({
  handleClose,
  orderId,
}: {
  handleClose: () => void
  orderId: number
}) => {
  const dispatch = useAppDispatch()
  const [text, setText] = useState("")
  const list = useAppSelector(selectCommentsList)
  const listStatus = useAppSelector(selectCommentsStatus)
  const isLoadingList = listStatus === StatusResponse.LOADING
  const isSuccessList = listStatus === StatusResponse.SUCCESS
  const isErrorList = listStatus === StatusResponse.ERROR
  const createLoading =
    useAppSelector(selectAddCommentStatus) === StatusResponse.LOADING

  const onAddComment = (e: any) => {
    e.preventDefault()
    if (text) {
      dispatch(addComment({ orderId, text }))
      setText("")
    }
  }
  useEffect(() => {
    dispatch(getComments(orderId))
  }, [])
  return (
    <Box
      sx={{
        maxWidth: "500px",
        margin: "30px auto 10px auto",
        padding: "50px 20px 40px 20px",
        maxHeight: "80vh",
        background: tokensDark.primary[500],
        position: "relative",
        "@media(max-width:640px)": {
          width: "95%",
        },
      }}
      component={Paper}
    >
      <IconButton
        onClick={handleClose}
        sx={{ position: "absolute", top: "20px", right: "20px" }}
      >
        <CloseIcon />
      </IconButton>
      <Stack
        component="form"
        onSubmit={onAddComment}
        mt={2}
        direction="row"
        alignItems="center"
        spacing={1}
        mb={2}
      >
        <FormControl fullWidth>
          <OutlinedInput
            value={text}
            onChange={e => {
              setText(e.target.value)
            }}
            endAdornment={
              <InputAdornment position="end">
                {createLoading ? (
                  <PendingIcon sx={{ color: "#a8b2d1" }} />
                ) : (
                  <IconButton type="submit">
                    <SendIcon sx={{ color: "#64ffda", cursor: "pointer" }} />
                  </IconButton>
                )}
              </InputAdornment>
            }
            sx={{
              boxShadow:
                "0px 3.22556px 16.1278px -4.61021px rgba(0, 0, 0, 0.15)",
              borderRadius: "16.1278px",
            }}
            placeholder="Комментарий..."
          />
        </FormControl>
      </Stack>
      {isLoadingList ? (
        <Stack spacing={2} justifyContent="flex-end">
          {...Array(5)
            .fill(5)
            .map((_, index) => {
              return (
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="flex-end"
                  mb="10px"
                >
                  <Skeleton
                    key={index}
                    variant="circular"
                    height={40}
                    width={40}
                  />
                  <Skeleton
                    key={index}
                    variant="rounded"
                    width="85%"
                    height={50}
                  />
                </Stack>
              )
            })}
        </Stack>
      ) : null}
      {isSuccessList && list.length <= 0 ? (
        <Box
          sx={{
            minHeight: "300px",
            maxHeight: "500px",
            overflowY: "auto",
            width: "100%",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Typography sx={{ color: "#a8b2d1" }}>Комментариев нет</Typography>
        </Box>
      ) : null}
      {isErrorList ? (
        <Box
          sx={{
            minHeight: "300px",
            maxHeight: "500px",
            overflowY: "auto",
            width: "100%",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Typography sx={{ color: "#ff6388" }}>
            Ошибка при получении комментариев
          </Typography>
        </Box>
      ) : null}
      {isSuccessList && list.length >= 1 ? (
        <Box
          sx={{
            height: "400px",
            overflowY: "auto",
            width: "100%",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {list.map(comment => {
            return (
              <MessageItem
                username={comment.user.email}
                date={comment.created_at}
                userType={comment.user.type}
                key={comment.id}
                text={comment.text}
              />
            )
          })}
        </Box>
      ) : null}
    </Box>
  )
}

export default Comments
