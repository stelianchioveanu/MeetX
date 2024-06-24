using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Security.Principal;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace MobyLabWebProgramming.Infrastructure.Services.Implementations;
public class JobSimilarityService
{
    private static readonly HttpClient client = new HttpClient();

    public class Data
    {
        public IList<IList<float>> embeddings { get; set; }
    }

    public static async Task<string> RecommendJobs(string userInput)
    {
        var userEmbeddings = await GetEmbeddingsFromPython(userInput);

        var jobList = LoadJobData("job_titles_with_embeddings.csv");

        var sortedJobs = jobList
            .Select(j => new { JobTitle = j.Key, Similarity = CosineSimilarity(j.Value, userEmbeddings) })
            .OrderByDescending(j => j.Similarity)
            .ToList();
        Console.WriteLine(sortedJobs.First());
        var list = sortedJobs.Where(e => e.Similarity >= 0.99978).Select(j => j.JobTitle).ToList();
        if (list.Count == 0)
        {
            return "";
        }
        return list.First();
    }

    private static Dictionary<string, float[]> LoadJobData(string filePath)
    {
        var jobList = new Dictionary<string, float[]>();

        using (var reader = new StreamReader(filePath))
        {
            Regex CSVParser = new Regex(",(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))");
            var aux1 = reader.ReadLine();
            var header = CSVParser.Split(aux1);

            int titleIndex = Array.IndexOf(header, "JobTitle");
            int embeddingsIndex = Array.IndexOf(header, "embeddings");

            while (!reader.EndOfStream)
            {
                var aux = reader.ReadLine();
                var line = CSVParser.Split(aux);
                var jobTitle = line[titleIndex];
                var embeddingsJson = line[embeddingsIndex];
                embeddingsJson = embeddingsJson.Substring(1, embeddingsJson.Length - 2);
                List<List<float>> listOfLists = JsonConvert.DeserializeObject<List<List<float>>>(embeddingsJson);
                var embeddings = listOfLists.FirstOrDefault()?.ToArray();

                if (embeddings != null)
                {
                    jobList[jobTitle] = embeddings;
                }
            }
        }

        return jobList;
    }

    private static async Task<float[]> GetEmbeddingsFromPython(string text)
    {
        var requestUri = "http://localhost:8000/embeddings";

        var request = new HttpRequestMessage(HttpMethod.Post, requestUri)
        {
            Content = new StringContent(JsonConvert.SerializeObject(new { text }), System.Text.Encoding.UTF8, "application/json")
        };

        var response = await client.SendAsync(request);
        response.EnsureSuccessStatusCode();
        var jsonResponse = await response.Content.ReadAsStringAsync();

        Data data = JsonConvert.DeserializeObject<Data>(jsonResponse);
        float[] embeddings = data.embeddings[0].ToArray();
        return embeddings;
    }

    private static float CosineSimilarity(float[] vectorA, float[] vectorB)
    {
        var dotProduct = vectorA.Zip(vectorB, (a, b) => a * b).Sum();
        var magnitudeA = Math.Sqrt(vectorA.Sum(x => x * x));
        var magnitudeB = Math.Sqrt(vectorB.Sum(x => x * x));
        return (float)(dotProduct / (magnitudeA * magnitudeB));
    }
}
