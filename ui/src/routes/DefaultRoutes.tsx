import {OverridableComponent} from "@mui/material/OverridableComponent";
import {SvgIconTypeMap} from "@mui/material/SvgIcon/SvgIcon";

export type PmmRoute = {
    name: string,
    key: string | null,
    description: string | null,
    component: any,
    standardNav: boolean,
    icon: OverridableComponent<SvgIconTypeMap> & { muiName: string } | null
    subRoutes: PmmRoute[] | null
}