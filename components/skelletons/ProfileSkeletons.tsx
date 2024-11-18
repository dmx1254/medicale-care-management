import { Card } from "../ui/card";

const ProfileSkeletons = () => {
  return (
    <div className="min-h-screen w-full bg-[#1A1D21] p-4 flex flex-col items-center gap-8">
      {/* Section 1 - Profile Header */}
      <Card className="w-full max-w-4xl p-6 space-y-4 border-none rounded-[15px]">
        <div className="flex items-center gap-4">
          <div className="space-y-2 flex-1">
            <div className="h-6 bg-[#363A3D] rounded animate-pulse w-1/3" />
            <div className="h-4 bg-[#363A3D] rounded animate-pulse w-1/4" />
          </div>
        </div>
      </Card>

      {/* Section 1 - Main Content */}
      <Card className="w-full max-w-4xl p-6 space-y-6 border-none rounded-[15px]">
        <div className="space-y-4">
          <div className="h-4 bg-[#363A3D] rounded animate-pulse w-3/4" />
          <div className="h-4 bg-[#363A3D] rounded animate-pulse w-full" />
          <div className="h-4 bg-[#363A3D] rounded animate-pulse w-2/3" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-32 bg-[#363A3D] rounded animate-pulse" />
          <div className="h-32 bg-[#363A3D] rounded animate-pulse" />
        </div>
      </Card>
      {/* Section 2 - Main Content */}
      <Card className="w-full max-w-4xl p-6 space-y-6 border-none rounded-[15px]">
        <div className="space-y-4">
          <div className="h-4 bg-[#363A3D] rounded animate-pulse w-3/4" />
          <div className="h-4 bg-[#363A3D] rounded animate-pulse w-full" />
          <div className="h-4 bg-[#363A3D] rounded animate-pulse w-2/3" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-32 bg-[#363A3D] rounded animate-pulse" />
          <div className="h-32 bg-[#363A3D] rounded animate-pulse" />
        </div>
      </Card>

      {/* Section 3 - Bottom Section */}
      <Card className="w-full max-w-4xl p-6 space-y-4 border-none rounded-[15px]">
        <div className="h-4 bg-[#363A3D] rounded animate-pulse w-1/2" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="h-24 bg-[#363A3D] rounded animate-pulse" />
          <div className="h-24 bg-[#363A3D] rounded animate-pulse" />
          <div className="h-24 bg-[#363A3D] rounded animate-pulse" />
        </div>
      </Card>
    </div>
  );
};

export default ProfileSkeletons;
