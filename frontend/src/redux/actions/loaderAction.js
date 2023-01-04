import { TURN_OFF_LOADER, TURN_ON_LOADER } from "./types"

export const turnOnLoader = () => {
  return {
    type: TURN_ON_LOADER
  }
}
export const turnOffLoader = () => {
  return {
    type: TURN_OFF_LOADER
  }
}

