using System;
using Application.DTOs;
using Application.Interfaces;
using Application.Profiles.DTOs;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos;

public class PhotoServices : IPhotoService
{
     private readonly Cloudinary _cloudinary;

    public PhotoServices(IOptions<CloudinarySettings> config) {
        
        var acc = new Account(
            config.Value.CloudName,
            config.Value.ApiKey,
            config.Value.ApiSecret
        );

        _cloudinary = new Cloudinary(acc);
    }

    public async Task<string> DeletePhotoAsync(string publicId)
    {
        var deleteParams = new DeletionParams(publicId);
        var result =await _cloudinary.DestroyAsync(deleteParams);
        if (result.Error != null) throw new Exception(result.Error.Message);
        return result.Result;
    }

    public async Task<PhotoUploadResult?> AddPhotoAsync(IFormFile file)
    {
        if (file.Length > 0)
        {
            await using var stream = file.OpenReadStream();

            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                //  Transformation = new CloudinaryDotNet.Transformation().Crop("fill").Width(500).Height(500).Gravity("face")
                Folder = "reactivities2025"
            };

            var uploadresult = await _cloudinary.UploadAsync(uploadParams);

            if (uploadresult.Error != null)
            {
                throw new Exception(uploadresult.Error.Message);
            }

            return new PhotoUploadResult
            {
                PublicId = uploadresult.PublicId,
                Url = uploadresult.SecureUrl.AbsoluteUri
            };
       }
            return null;
    }
}
