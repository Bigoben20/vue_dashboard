<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class ExchangeController extends Controller
{
    public $frankfurterEndpoint;

    public function __construct()
    {
        $this->frankfurterEndpoint = "https://api.frankfurter.app";
    }

    public function getExchange(Request $request)
    {
        if ($request->beginDate || $request->endDate) {
            $url = $this->getDate($request);
        } else {
            $url = "/latest?";
        }
        $url = $this->getFromTo($url,$request);
        
        $client = new Client();

        $response = $client->request('GET', $this->frankfurterEndpoint.$url, [
            'headers' => [
                'Accept' => 'application/json',
            ]
        ]);
        
        return json_decode($response->getBody());
    }

    public function getFromTo($url,$request)
    {
        if ($request->from != null) {
            $url = $url."from=".$request->from."&";
        }
        if ($request->to != null) {
            $url = $url."to=".$request->to."&";
        }
        
        return $url;
    }
    
    public function getDate($request)
    {
        $url = "/".$request->beginDate;
        if ($request->endDate != null) {
            if ($request->endDate != $request->beginDate) {
                $url = $url."..".$request->endDate;
            }
        } else {
            $url = $url."..";
        }
        
        return $url;
    }
}
