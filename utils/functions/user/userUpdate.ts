import { userUpdateProps } from "@/utils/types";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const userUpdate = async ({
  email,
  firstName,
  lastName,
  profileImageUrl,
  id,
}: {
  email: string;
  firstName: string;
  lastName: string;
  profileImageUrl?: string;
  id: string;
}) => {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  try {
    const { data, error } = await supabase
      .from("User")
      .update([
        {
          email,
          firstName,
          lastName,
          profileImageUrl,
          id,
        },
      ])
      .eq("email", email)
      .select();

    if (data) return data;

    if (error) return error;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
