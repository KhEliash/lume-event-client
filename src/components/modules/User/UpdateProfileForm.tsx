/* eslint-disable @typescript-eslint/no-explicit-any */
 "use client";

import { useState, useTransition, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import { toast } from "sonner";
import { Camera, Loader2, User as UserIcon, X } from "lucide-react";

// shadcn/ui
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormMessage, FormLabel, FormControl } from "@/components/ui/form";
import { updateProfileAction } from "@/services/user/userprofile";

// your actions
// import { updateProfileAction } from "@/actions/user/update-profile-action";
// import { updateProfileImageAction } from "@/actions/user/update-profile-image-action";

// ---------------- Schema ----------------

const ProfileSchema = z.object({
  fullName: z.string().min(2),
  bio: z.string().optional(),
  phone: z.string().optional(),
  locationCity: z.string().optional(),
  locationArea: z.string().optional(),
  interests: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof ProfileSchema>;

interface UpdateProfileFormProps {
  user: any;
}

// ---------------- Component ----------------

export function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      fullName: user.fullName,
      bio: user.bio || "",
      phone: user.phone || "",
      locationCity: user.location?.city || "",
      locationArea: user.location?.area || "",
      interests: user.interests?.join(", ") || "",
    },
  });

  // ---------- Image Handler ----------
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    if (!f.type.startsWith("image/")) {
      toast.error("Invalid file");
      return;
    }

    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const uploadImage = () => {
    if (!file) return toast.warning("Select a file first");

console.log(file);

    // startTransition(async () => {
    //   const res = await updateProfileImageAction(file, user._id);

    //   if (res.success) {
    //     toast.success("Profile picture updated");
    //     setPreview(null);
    //     setFile(null);
    //   } else {
    //     toast.error(res.message);
    //   }
    // });
  };

  // ---------- Submit Data ----------
  const onSubmit = (values: ProfileFormValues) => {
    const payload = {
      fullName: values.fullName,
      bio: values.bio,
      phone: values.phone,
      location: {
        city: values.locationCity,
        area: values.locationArea,
      },
      interests: values.interests
        ? values.interests.split(",").map((i) => i.trim())
        : [],
    };
console.log(values);

   startTransition(async () => {
  const res = await updateProfileAction(user._id, payload);

  if (res.success) {
    toast.success(res.message);
  } else {
    toast.error(res.message);
  }
});
  };

  const imageToShow = preview || user.profileImage;

  return (
    <div className="max-w-3xl mx-auto space-y-8">

      {/* Image Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-6 items-center">

          {/* Image Preview */}
          <div className="relative w-28 h-28 rounded-full overflow-hidden border">
            {imageToShow ? (
              <Image src={imageToShow} alt="avatar" fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <UserIcon className="w-10 h-10 text-gray-500" />
              </div>
            )}

            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

            {!file && (
              <button
                type="button"
                className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full"
                onClick={() => fileRef.current?.click()}
              >
                <Camera className="w-4 h-4" />
              </button>
            )}

            {file && (
              <button
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                }}
                className="absolute top-1 right-1 p-2 bg-red-600 text-white rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Upload */}
          <div className="flex-1">
            {file ? (
              <Button onClick={uploadImage} disabled={isPending} className="bg-green-600 text-white">
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Upload Image"}
              </Button>
            ) : (
              <p className="text-gray-500 text-sm">Choose an image to upload</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Text Form */}
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

              {/* Full Name */}
              <FormField
                name="fullName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter full name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Phone number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bio */}
              <FormField
                name="bio"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} placeholder="Write something..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  name="locationCity"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="City" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="locationArea"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Area / Neighborhood" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Interests */}
              <FormField
                name="interests"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interests</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="hiking, tech, gaming..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button type="submit" disabled={isPending} className="w-full bg-blue-600">
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
              </Button>

            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
