/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import { toast } from "sonner";
import {
  // Camera,
  Loader2,
  User as UserIcon,
  // X,
  Zap,
  ShieldAlert,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { updateProfileAction } from "@/services/user/userprofile";

const ProfileSchema = z.object({
  fullName: z.string().min(2, "Name is required for verification"),
  bio: z.string().optional(),
  phone: z.string().optional(),
  locationCity: z.string().optional(),
  locationArea: z.string().optional(),
  interests: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof ProfileSchema>;

export function UpdateProfileForm({ user }: { user: any }) {
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

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f || !f.type.startsWith("image/"))
      return toast.error("INVALID FORMAT");
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const onSubmit = (values: ProfileFormValues) => {
    const payload = {
      fullName: values.fullName,
      bio: values.bio,
      phone: values.phone,
      location: { city: values.locationCity, area: values.locationArea },
      interests: values.interests
        ? values.interests.split(",").map((i) => i.trim())
        : [],
    };

    startTransition(async () => {
      const res = await updateProfileAction(user._id, payload);
      if (res.success) {
        toast.success("IDENTITY UPDATED");
        window.location.href = "/profile";
      } else {
        toast.error(res.message);
      }
    });
  };

  const imageToShow = preview || user.profileImage;

  return (
    <div className=" mx-auto py-10  space-y-12">
      <div className="border-b-4 border-emerald-950 pb-4">
        <h1 className="text-4xl font-black text-emerald-950 uppercase tracking-tighter italic">
          Identity Override
        </h1>
        <p className="text-amber-600 font-bold text-xs uppercase tracking-[0.2em] mt-2">
          Modify core credentials and profile visuals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Visual Identity (Image) */}
        <div className="md:col-span-1 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-emerald-950/40">
            Visual Spec
          </h3>
          <div className="relative group w-full aspect-square border-4 border-emerald-950 bg-white shadow-[8px_8px_0px_0px_rgba(6,78,59,1)]">
            {imageToShow ? (
              <Image
                src={imageToShow}
                alt="avatar"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-950/20">
                <UserIcon size={48} />
              </div>
            )}

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />

            {/* <button
              type="button"
              className="absolute -bottom-2 -right-2 bg-amber-400 border-2 border-emerald-950 p-3 hover:bg-emerald-950 hover:text-amber-400 transition-colors shadow-[2px_2px_0px_0px_rgba(6,78,59,1)]"
              onClick={() => (file ? setFile(null) : fileRef.current?.click())}
            >
              {file ? <X size={20} /> : <Camera size={20} />}
            </button> */}
          </div>
          {file && (
            <Button className="w-full rounded-none bg-emerald-950 text-amber-400 border-2 border-emerald-950 font-black uppercase tracking-widest text-[10px] h-8">
              Confirm New Image
            </Button>
          )}
        </div>

        {/* Credentials Form */}
        <div className="md:col-span-2 border-4 border-emerald-950 p-8 bg-white">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="fullName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black uppercase tracking-widest text-[10px] text-emerald-950/50">
                      Official Designation
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="rounded-none border-2 border-emerald-950 focus-visible:ring-amber-400 font-bold uppercase"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] uppercase font-bold text-red-600" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-black uppercase tracking-widest text-[10px] text-emerald-950/50">
                        Secure Line
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          className="rounded-none border-2 border-emerald-950 focus-visible:ring-amber-400 font-bold"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="locationCity"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-black uppercase tracking-widest text-[10px] text-emerald-950/50">
                        HQ City
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="rounded-none border-2 border-emerald-950 focus-visible:ring-amber-400 font-bold"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="bio"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black uppercase tracking-widest text-[10px] text-emerald-950/50">
                      Mission Statement (Bio)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={3}
                        className="rounded-none border-2 border-emerald-950 focus-visible:ring-amber-400 font-medium italic"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="interests"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black uppercase tracking-widest text-[10px] text-emerald-950/50">
                      Affinities (Comma Separated)
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          className="rounded-none border-2 border-emerald-950 focus-visible:ring-amber-400 pr-10"
                        />
                        <Zap
                          size={14}
                          className="absolute right-3 top-3 text-amber-500"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="pt-4 flex flex-col gap-4">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full rounded-none bg-emerald-950 text-amber-400 hover:bg-amber-400 hover:text-emerald-950 border-2 border-emerald-950 font-black uppercase tracking-widest h-14 transition-all shadow-[6px_6px_0px_0px_rgba(6,78,59,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Authorize Changes"
                  )}
                </Button>
                <p className="flex items-center justify-center gap-2 text-[10px] font-bold text-emerald-950/40 uppercase tracking-tighter">
                  <ShieldAlert size={12} /> Modifications are immediate and
                  irreversible
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
