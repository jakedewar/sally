import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export const userCreate = async ({
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
      .insert([
        {
          email,
          firstName,
          lastName,
          profileImageUrl,
          id,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error creating user:", error);
    return { data: null, error };
  }
};
