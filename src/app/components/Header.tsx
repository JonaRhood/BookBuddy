import Image from "next/image"

export default function Header() {
    return (
        <div className="flex h-24 relative">
            <Image
                src={'./header.svg'}
                alt="Header Background Image"
                fill
                style={{
                    objectFit: 'cover',
                }}
            />
            <div className="z-2 flex h-19 ml-10">
                <Image
                    src={'./complete-logo.svg'}
                    alt="Logo Picture"
                    width={200}
                    height={100}
                />
            </div>
        </div>
    )
}