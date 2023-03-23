import QuicksButton from "@/components/Quicks/QuicksButton";

export default function MainLayout({ children }){
    return(
        <>
            { children }

            <QuicksButton />
        </>
    )
}