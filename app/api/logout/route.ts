import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(){
    try {
        const cookieStore = await cookies();
        // Clear the authToken cookie
        cookieStore.delete("authToken");
        
        // Optionally, you can also clear other cookies if needed
        // cookieStore.delete("anotherCookieName");

        return NextResponse.json({ success: true, message: "Logout successful" });
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json(
            { success: false, message: "Server error occurred" },
            { status: 500 }
        );
    }
}