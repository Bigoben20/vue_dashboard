<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public $newsEndpoint;

    public $newsApiKey;
    
    public function __construct()
    {
        $this->newsEndpoint = "https://newsapi.org/v2/";
        $this->newsApiKey = "6f04d97fc7134af09d5c4bba193208a6";
    }

    public function getNews(Request $request) {
        $query = [
            'apiKey' => $this->newsApiKey,
            'pageSize' => 20
        ];
        if ($request->input("search")) {
            $query["q"] = $request->input("search");
        }
        if ($request->input("page")) {
            $query["page"] = $request->input("page");
        }

        switch ($request->input("type")) {
                case 'top-headlines':
                    $url = "top-headlines";
                    if (!$request->input("country") && !$request->input("category") ) {
                        return [
                            "success" => false,
                            "message" => "country parameter is required"
                        ];
                    }
                    if ($request->input("country")) {
                        $query["country"] = $request->input("country");
                    }
                    if ($request->input("category")) {
                        $query["category"] = $request->input("category");
                    }
                    
                    
                    break;
                
                default:
                    $url = "everything";
                    if ($request->input("from")) {
                        $query["from"] = $request->input("from");
                    }
                    if ($request->input("to")) {
                        $query["to"] = $request->input("to");
                    }
                    break;
        }
        $client = new Client();
                    $response = $client->request('GET', $this->newsEndpoint.$url, [
                        'query' => $query,
                        'headers' => [
                            'Accept' => 'application/json',
                        ],
                    ]);
                    
                    return json_decode($response->getBody());

    }
}
