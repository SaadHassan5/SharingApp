import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Review = (props) => (
  <Svg
    width={14}
    height={13}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6.57.922 5.047 4.039l-3.445.492c-.61.094-.844.844-.399 1.29l2.461 2.413-.586 3.399c-.094.61.563 1.078 1.102.797l3.07-1.617 3.047 1.617c.539.28 1.195-.188 1.101-.797l-.585-3.399 2.46-2.414c.446-.445.211-1.195-.398-1.289L9.453 4.04 7.906.922c-.258-.54-1.054-.563-1.336 0Z"
      fill="#FFC226"
    />
  </Svg>
)

export default Review;