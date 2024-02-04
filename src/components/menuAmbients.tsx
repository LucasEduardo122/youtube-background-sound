import { Icon } from "@phosphor-icons/react"

interface menuProps {
    icon: Icon,
    ambientsActive: (event: any) => void,
    id: string
}

export default function MenuComponentAmbients({icon: Icon, ambientsActive, id}: menuProps) {

    return (
        <a href="#" onClick={ambientsActive} className="text-white block px-4 py-2 text-sm" role="menuitem" tabIndex={-1}>
            <Icon size={25} color="white" id={`${id}`}/>
        </a>
    )
}