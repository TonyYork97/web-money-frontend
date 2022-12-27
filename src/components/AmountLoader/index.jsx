import React from "react"
import ContentLoader from "react-content-loader"

const AmountLoader = (props) => (
  <ContentLoader
    rtl
    speed={20}
    width={126}
    height={28}
    viewBox="0 0 126 28"
    backgroundColor="#5D6D70"
    foregroundColor="#C6FF00"
    {...props}
  >
    <rect x="0" y="0" rx="10" ry="10" width="126" height="28" />
  </ContentLoader>
)

export default AmountLoader

