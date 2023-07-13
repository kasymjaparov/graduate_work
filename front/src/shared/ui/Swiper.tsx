import { tokensDark } from "@/app/providers/ThemeProvider"
import { Box, IconButton, Modal, Stack } from "@mui/material"
import ImageIcon from "@mui/icons-material/Image"
import CloseIcon from "@mui/icons-material/Close"
import { useState } from "react"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import Loading from "./Loading"

interface Prop {
  images: string[]
}
const Swiper: React.FC<Prop> = ({ images }) => {
  const [imageModal, setImageModal] = useState(false)
  const [loader, setLoader] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const handleImageModalClick = (url: string) => {
    setImageModal(true)
    setImageUrl(url)
  }
  const swipeNext = () => {
    const total = images.length
    const currentIndex = images.indexOf(imageUrl)
    const nextIndex = (currentIndex + 1) % total
    setImageUrl(images[nextIndex]!.toString())
    setLoader(false)
  }
  const swipePrev = () => {
    const total = images.length
    const currentIndex = images.indexOf(imageUrl)
    const nextIndex =
      currentIndex - 1 === -1 ? total - 1 : (currentIndex - 1) % total
    setImageUrl(images[nextIndex]!.toString())
    setLoader(false)
  }
  const handleKeyboard = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === 37 && images.length > 1) {
      swipePrev()
    } else if (e.keyCode === 39 && images.length > 1) {
      swipeNext()
    }
  }
  return (
    <Stack direction="row">
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={imageModal}
        onClose={() => setImageModal(false)}
        onKeyUp={handleKeyboard}
      >
        <Box
          sx={{
            width: "70%",
            textAlign: "center",
            "@media(max-width:900px)": {
              width: "95%",
            },
            position: "relative",
          }}
        >
          <IconButton
            onClick={() => setImageModal(false)}
            sx={{
              position: "absolute",
              right: 0,
              top: -50,
              background: "rgba(0, 0, 0, 0.04)",
            }}
          >
            <CloseIcon sx={{ fontSize: "25px", color: "#fff" }} />
          </IconButton>
          {images.length > 1 ? (
            <>
              <IconButton
                onClick={() => swipeNext()}
                sx={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(0, 0, 0, 0.04)",
                  zIndex: "6",
                }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: "25px", color: "#fff" }} />
              </IconButton>
              <IconButton
                onClick={() => swipePrev()}
                sx={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(0, 0, 0, 0.04)",
                  zIndex: "6",
                }}
              >
                <ArrowBackIosNewIcon sx={{ fontSize: "25px", color: "#fff" }} />
              </IconButton>
            </>
          ) : null}

          <div className="swiper-image-container">
            <img
              style={{ maxWidth: "100%", maxHeight: "90vh" }}
              src={imageUrl}
              alt="user file"
              onLoad={() => setLoader(true)}
              loading="lazy"
            />
            {!loader && (
              <div className="swiper-image-overlay">
                <Loading />
              </div>
            )}
          </div>
        </Box>
      </Modal>
      <Stack direction="row" flexWrap="wrap">
        {images.map(image => {
          return (
            <IconButton
              disableTouchRipple
              key={image}
              onClick={() => handleImageModalClick(image)}
              sx={{ borderRadius: "6px", width: "55px", heigth: "55px" }}
              size="medium"
            >
              <ImageIcon
                sx={{
                  fontSize: "22px",
                  color: tokensDark.greenAccent[500],
                }}
              />
            </IconButton>
          )
        })}
      </Stack>
    </Stack>
  )
}

export default Swiper
