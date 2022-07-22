import { Theme } from "../states/Theme"

export const useTheme = () => useState<Theme>("theme", () => new Theme())
