import { Colors } from "@/constants/theme";
import HeaderTitle from "./title";

export const DEFAULT_HEADER_OPTIONS = {
    headerTitle: () => HeaderTitle(),
    headerStyle: {
        backgroundColor: Colors.light.headerBackground,
    }
}